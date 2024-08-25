/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Response, NextFunction } from 'express';
import { updateToken } from '@core/auth/authToken.strategy';
import AppLogger from '@core/logger';

export function responseInterceptor(req: any, res: Response, next: NextFunction): void {
  const logger = new AppLogger();

  next();
}
