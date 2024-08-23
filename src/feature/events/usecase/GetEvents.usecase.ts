import type { Request, Response, NextFunction } from 'express';
import { GetEventsResponse } from '../response/GetEvents.response';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { GetEventsRequest } from '../request/GetEvents.request';
import { google } from 'googleapis';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import { oAuth2Client } from '@core/google/OAuthClient';

export default async function GetEventsUsecase(req: Request, res: Response, next: NextFunction): Promise<Result<GetEventsResponse>> {
  const body: GetEventsRequest = req.body;
  const calendar = google.calendar('v3');

  // Set the access token (replace with your access token)
  const googleAccessToken = req.cookies['google_access_token'];

  oAuth2Client.setCredentials({ access_token: googleAccessToken });

  try {
    const response = await calendar.events.list({
      auth: oAuth2Client,
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    });

    const events = response.data.items || [];

    return Result.createSuccess(new GetEventsResponse(events));
  } catch (err) {
    throw new BadRequestException('error');
  }
}
