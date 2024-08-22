/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Response, NextFunction } from 'express';
import { updateToken } from '@core/auth/authToken.strategy';
import executeQuery from '@common/executeQuery';
import AppLogger from '@core/logger';

export function responseInterceptor(req: any, res: Response, next: NextFunction): void {
  const logger = new AppLogger();
  // Save the original send method
  // const originalSend = res.send.bind(res);

  // // Check if there is token in the header or not
  // const token: string =
  //   req.cookies?.accessToken ?? (req.headers['x-xsrf-token'] as string);

  // // Override the send method to intercept the response
  // res.send = ((body: any) => {
  //   const option = {
  //     httpOnly: true,
  //     secure: true
  //   };
  //   if (token !== null && token !== undefined) {
  //     generateCookiesAndUpdateRefreshTokenOnTable(token, req?.user?.userId)
  //       .then(
  //         (result: generateCookiesAndUpdateRefreshTokenOnTableInterface) => {
  //           res
  //             .cookie('accessToken', result.accessToken, option)
  //             .cookie('refreshToken', result.refreshToken, option);
  //         }
  //       )
  //       .catch((err: any) => {
  //         logger.error(err);
  //       });
  //   } else {
  //     originalSend(body);
  //   }
  // }) as Response['send'];

  // Move to the next middleware in the chain
  next();
}
