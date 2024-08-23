import AppLogger from '@core/logger';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { CreateTokenResponse } from '../response/CreateTokenResponse.dto';
import type { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { GetOauthUrlResponseDto } from '../response/GetOauthUrlResponse.dto';

export default async function GetOauthUrlUsecase(req: Request, res: Response, next: NextFunction): Promise<Result<GetOauthUrlResponseDto>> {
  const logger = new AppLogger();

  const GOOGLE_CLIENT_ID = '904229495190-qv1kut0ttlmdq8jse0g7n797ik1ee54f.apps.googleusercontent.com';
  const GOOGLE_CLIENT_SECRET = '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';
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');

  const redirectUrl = 'http://127.0.0.1:3000/v1/api/google/oauth2callback';

  const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUrl);

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar profile openid',
    prompt: 'consent'
  });
  console.log({ authorizeUrl });
  return Result.createSuccess(authorizeUrl);
}
