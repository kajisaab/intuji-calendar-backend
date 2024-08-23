/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { UnauthorizedError } from '@core/middleware/errorHandler/unauthorizedError';
import { createToken, decodeToken, verifyToken } from './JwtStrategy';
import config from '@config/index';
import { type JwtPayload } from 'jsonwebtoken';
import { JwtTokenUserDetail } from 'utils/jwtConfigInterface.interface';

export async function parseToken(token: string, tokenType: string): Promise<JwtTokenUserDetail | JwtPayload> {
  if (token === '' || token.length === 0) {
    throw new UnauthorizedError('Sorry token not provided');
  }
  try {
    const decodedToken: JwtPayload = decodeToken(token);

    if (tokenType === 'access') {
      const configKey = tokenType + 'Jwt';
      await verifyToken(token, config[configKey]);

      const currentUser: JwtTokenUserDetail = {
        aud: (decodedToken?.aud as string) ?? '',
        userId: (decodedToken?.id as string) ?? '',
        fullName: (decodedToken?.name as string) ?? '',
        refreshToken: (decodedToken?.refreshToken as string) ?? ''
      };

      return currentUser;
    }

    return decodedToken;
  } catch (err) {
    throw new UnauthorizedError('Token expired or invalid');
  }
}

export async function updateToken(token: string, tokenType: string): Promise<string> {
  if (token === '' || token.length === 0) {
    throw new UnauthorizedError('Sorry, Token not provided');
  }

  try {
    const decodedToken: JwtPayload = decodeToken(token);
    const configKey = tokenType + 'Jwt';

    if (decodeToken === null || decodedToken.iss !== config[configKey].issuer) {
      throw new UnauthorizedError('Sorry, invalid token');
    }

    const payload: JwtTokenUserDetail = {
      userId: decodedToken?.userId ?? '',
      fullName: decodedToken?.firstName ?? '',
      refreshToken: decodedToken?.refreshToken ?? ''
    };

    await verifyToken(token, config[configKey]);

    return createToken(payload, config[configKey], decodedToken.aud as string);
  } catch (err) {
    throw new UnauthorizedError('Token expired or invalid');
  }
}
