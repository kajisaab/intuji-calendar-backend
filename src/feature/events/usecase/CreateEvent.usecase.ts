import type { Request, Response, NextFunction } from 'express';
import { CreateEventResponseDto } from '../response/CreateEvent.response.dto';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { CreateEventRequestDto } from '../request/CreateEvent.request.dto';
import { google } from 'googleapis';
import { oAuth2Client } from '@core/google/OAuthClient';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import AppLogger from '@core/logger';

export function getRandomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

export default async function CreateEvent(req: Request, res: Response, next: NextFunction): Promise<Result<CreateEventResponseDto>> {
  const logger = new AppLogger();
  const body: CreateEventRequestDto = req.body;

  const calendar = google.calendar('v3');

  const googleAccessToken = req.cookies['google_access_token'];

  oAuth2Client.setCredentials({ access_token: googleAccessToken });

  try {
    const response = await calendar.events.insert({
      auth: oAuth2Client,
      calendarId: 'primary',
      requestBody: {
        summary: body?.summary,
        description: body?.description ?? '',
        location: body.location,
        colorId: getRandomNumber().toString(), // Ensure this is a string if required by the API
        start: {
          dateTime: new Date(body.start).toISOString(),
          timeZone: 'UTC' // or the user's timezone
        },
        end: {
          dateTime: new Date(body.end).toISOString(),
          timeZone: 'UTC' // or the user's timezone
        }
      }
    });

    return Result.createSuccess('Successfully Created a Calendar event');
  } catch (err) {
    logger.error('Error while creating event ' + err);
    throw new BadRequestException('error');
  }
}
