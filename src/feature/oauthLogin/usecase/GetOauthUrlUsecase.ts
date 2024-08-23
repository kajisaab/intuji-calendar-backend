import AppLogger from '@core/logger';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { CreateTokenResponse } from '../response/CreateTokenResponse.dto';
import type { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { GetOauthUrlResponseDto } from '../response/GetOauthUrlResponse.dto';
import config from '@config/index';
import { oAuth2Client } from '@core/google/OAuthClient';

export default async function GetOauthUrlUsecase(req: Request, res: Response, next: NextFunction): Promise<Result<GetOauthUrlResponseDto>> {
  const logger = new AppLogger();

  res.header('Access-Control-Allow-Origin', config.client_url);
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar profile openid',
    prompt: 'consent'
  });
  return Result.createSuccess(authorizeUrl);
}
