import type { Request, Response, NextFunction } from 'express';
import { GetEventsResponse } from '../response/GetEvents.response';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { GetEventsRequest } from '../request/GetEvents.request';
import { google } from 'googleapis';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';

const GOOGLE_CLIENT_ID = '904229495190-qv1kut0ttlmdq8jse0g7n797ik1ee54f.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const redirectUrl = 'http://127.0.0.1:3000/v1/api/google/oauth2callback';

export default async function GetEventsUsecase(req: Request, res: Response, next: NextFunction): Promise<Result<GetEventsResponse>> {
  const body: GetEventsRequest = req.body;
  const calendar = google.calendar('v3');
  // Set up OAuth 2.0 credentials (replace with your credentials)
  const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUrl);

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
