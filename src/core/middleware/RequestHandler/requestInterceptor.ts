import { PublicRoutes } from '@common/publicRoutes';
import { parseToken } from '@core/auth/authToken.strategy';
import type { NextFunction, Response } from 'express';
import { UnauthorizedError } from '../errorHandler/unauthorizedError';
import executeQuery from '@common/executeQuery';
import { type JwtPayload } from 'jsonwebtoken';

function requestInterceptor(req: any, res: Response, next: NextFunction): void {
  const inputs = [req.params, req.query, req.body];

  for (const input of inputs) {
    for (const key in input) {
      const value = input[key];
      if (typeof value === 'string' || value instanceof String) {
        input[key] = value.trim();
      }
    }
  }

  const isExcludedRoute = PublicRoutes.some((route: string) => req.originalUrl.includes(route));
  console.log({ isExcludedRoute });
  console.log('lower', req.originalUrl);

  if (isExcludedRoute) {
    console.log({ isExcludedRoute });
    next();
    return;
  }

  // here validate the api for the token;
  const token: string = req.cookies?.accessToken ?? (req.headers['x-xsrf-token'] as string);

  if (token === null || token === '' || token === undefined) {
    throw new UnauthorizedError('Token not provided');
  }

  parseToken(token, 'access')
    .then(async (parsedAccessToken) => {
      await parseToken(token, 'refresh').then(async (parsedRefreshToken: JwtPayload) => {
        if (parsedRefreshToken?.exp === null || parsedRefreshToken?.exp === undefined) {
          throw new UnauthorizedError('Cannot read the token');
        }

        // Get the current timestamp (in seconds)
        const currentTimestamp = Math.floor(Date.now() / 1000);

        // Compare the current timestamp with the expiration timestamp
        if (currentTimestamp >= parsedRefreshToken?.exp) {
          throw new UnauthorizedError('Token invalid or expired');
        }

        // Check if the user exists or not with the userId inside the token
        const response = await executeQuery(`SELECT EXISTS (SELECT 1 FROM ecommerce.user_details 
             WHERE id = '${parsedAccessToken.userId}') AS user_exists`);

        if (!response[0].userExists) {
          throw new UnauthorizedError('Token Invalid or expired');
        }
        req.user = parsedAccessToken;
        next();
      });
    })
    .catch((err) => {
      next(err);
    });
}

export default requestInterceptor;
