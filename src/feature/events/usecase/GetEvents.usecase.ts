import type { Request, Response, NextFunction } from 'express';
import { GetEventsResponse } from '../response/GetEvents.response';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { GetEventsRequest } from '../request/GetEvents.request';
import { google } from 'googleapis';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import { oAuth2Client } from '@core/google/OAuthClient';
import { UnauthorizedError } from '@core/middleware/errorHandler/unauthorizedError';

export default async function GetEventsUsecase(req: Request, res: Response, next: NextFunction): Promise<Result<GetEventsResponse>> {
  const body: GetEventsRequest = req.body;
  const calendar = google.calendar('v3');

  // Set the access token (replace with your access token)
  const googleAccessToken = req.cookies['google_access_token'];

  oAuth2Client.setCredentials({ access_token: googleAccessToken });

  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 20); // 20 days before

  const endDate = new Date(now);
  endDate.setDate(now.getDate() + 20); // 20 days after

  const timeMin = startDate.toISOString();
  const timeMax = endDate.toISOString();

  try {
    const response = await calendar.events.list({
      auth: oAuth2Client,
      calendarId: 'primary',
      timeMin: timeMin,
      timeMax: timeMax,
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime'
    });

    const events = response.data.items || [];

    return Result.createSuccess(new GetEventsResponse(events));
  } catch (err) {
    throw new UnauthorizedError(`err ${err}`);
  }
}
