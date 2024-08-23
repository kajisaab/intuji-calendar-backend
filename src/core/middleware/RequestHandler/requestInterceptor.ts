import { PublicRoutes } from '@common/publicRoutes';
import { parseToken } from '@core/auth/authToken.strategy';
import type { Request, NextFunction, Response } from 'express';
import { UnauthorizedError } from '../errorHandler/unauthorizedError';
import executeQuery from '@common/executeQuery';
import { type JwtPayload } from 'jsonwebtoken';
import { databaseService } from '@config/db.config';
import { User } from '@feature/oauthLogin/entity/User.entity';

function requestInterceptor(req: Request, res: Response, next: NextFunction): void {
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

  if (isExcludedRoute) {
    next();
    return;
  }

  // here validate the api for the token;
  const token = req.headers['x-xsrf-token'] as string;

  if (token === null || token === '' || token === undefined) {
    throw new UnauthorizedError('Token not provided');
  }

  parseToken(token, 'access')
    .then(async (parsedAccessToken: JwtPayload) => {
      // Check if the user exists or not with the userId inside the token

      const userRepository = databaseService.getRepository(User);

      const response = await userRepository.findOneBy({ id: parsedAccessToken.userId });
      // const response = await executeQuery(`SELECT EXISTS (SELECT 1 FROM ecommerce.user_details
      //      WHERE id = '${parsedAccessToken.userId}') AS user_exists`);

      if (!response) {
        throw new UnauthorizedError('Token Invalid or expired');
      }

      // req?.['user'] = parsedAccessToken;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

export default requestInterceptor;
