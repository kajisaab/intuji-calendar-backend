import { Result } from '@core/middleware/ResponseHandler/Result';
import type { Request, Response, NextFunction } from 'express';
import { DeleteEventResponseDto } from '../response/DeleteEvent.response.dto';
import AppLogger from '@core/logger';
import { google } from 'googleapis';
import { oAuth2Client } from '@core/google/OAuthClient';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';

export default async function deleteEventUsecase(req: Request, res: Response, next: NextFunction): Promise<Result<DeleteEventResponseDto>> {
  const logger = new AppLogger();

  const eventId = req.params.id;

  const calendar = google.calendar('v3');

  const googleAccessToken = req.cookies['google_access_token'];

  console.log({ eventId });
  oAuth2Client.setCredentials({ access_token: googleAccessToken });

  try {
    await calendar.events.delete({
      auth: oAuth2Client,
      calendarId: 'primary',
      eventId: eventId
    });

    return Result.createSuccess(new DeleteEventResponseDto('Successfully updated'));
  } catch (err) {
    logger.error(`Error while updating event ${err}`);
    throw new BadRequestException('error');
  }
}
