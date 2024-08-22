import { UnauthorizedError } from '@core/middleware/errorHandler/unauthorizedError';
import * as jwt from 'jsonwebtoken';
import { type JwtConfigurationInterface } from 'utils/jwtConfigInterface.interface';

export function createToken(payload: string | object | Buffer, jwtConfig: JwtConfigurationInterface, audience: string): string {
  return jwt.sign(payload, jwtConfig.secret, {
    algorithm: 'HS256',
    expiresIn: jwtConfig.expiresIn,
    issuer: jwtConfig.issuer,
    audience: audience ?? jwtConfig.audience
  });
}

export async function verifyToken(token: string, jwtConfig: JwtConfigurationInterface): Promise<jwt.JwtPayload> {
  return await new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(
      token,
      jwtConfig.secret,
      {
        algorithms: ['HS256'],
        issuer: jwtConfig.issuer,
        audience: jwtConfig.audience
      },
      (err, decodeToken) => {
        if (err !== null) {
          reject(new UnauthorizedError('Token verification failed'));
        } else {
          resolve(decodeToken as jwt.JwtPayload);
        }
      }
    );
  });
}

export function decodeToken(token: string): jwt.JwtPayload {
  return jwt.decode(token) as jwt.JwtPayload;
}
