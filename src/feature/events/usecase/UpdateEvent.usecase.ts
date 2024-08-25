import { Result } from '@core/middleware/ResponseHandler/Result';
import type { Request, Response, NextFunction } from 'express';
import { UpdateEventResponseDto } from '../response/UpdateEvent.response.dto';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import { oAuth2Client } from '@core/google/OAuthClient';
import { google } from 'googleapis';
import { getRandomNumber } from './CreateEvent.usecase';
import AppLogger from '@core/logger';

export default async function updateEventUsecase(req: Request, res: Response, next: NextFunction): Promise<Result<UpdateEventResponseDto>> {
  const logger = new AppLogger();
  const body = req.body;

  if (!body.summary) {
    throw new BadRequestException('Summary cannot be empty');
  }

  if (!body.start) {
    throw new BadRequestException('Start Date cannot be empty');
  }

  if (!body.end) {
    throw new BadRequestException('End Date cannot be empty');
  }

  if (body.location) {
    throw new BadRequestException('Location cannot be empty');
  }

  const calendar = google.calendar('v3');

  const googleAccessToken = req.cookies['google_access_token'];

  oAuth2Client.setCredentials({ access_token: googleAccessToken });

  try {
    const response = await calendar.events.update({
      auth: oAuth2Client,
      calendarId: 'primary',
      eventId: body.eventId, // Ensure that `eventId` is passed in the request body

      requestBody: { ...body }
    });

    return Result.createSuccess(new UpdateEventResponseDto('Successfully updated'));
  } catch (err) {
    logger.error(`Error while updating event ${err}`);
    throw new BadRequestException('error');
  }
}
