import type { Request, Response, NextFunction } from 'express';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { createToken } from '@core/auth/JwtStrategy';
import config from '@config/index';
import { type JwtConfigurationInterface } from 'utils/jwtConfigInterface.interface';
import AppLogger from '@core/logger';
import type { LoginResponseDto } from '../dto/loginResponse.dto';
import { LoginRequestDto } from '../request/loginReuqestDto.dto';

async function LoginUsecase(req: Request, res: Response, next: NextFunction): Promise<Result<LoginResponseDto>> {
  const logger = new AppLogger();
  try {
    const body: LoginRequestDto = req.body;

    return Result.createSuccess('response');
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export default LoginUsecase;

function generateAccessAndRefreshToken(payload: string | object | Buffer): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = createToken(payload, config.accessJwt as JwtConfigurationInterface, config.accessJwt.audience as string);
  const refreshToken = createToken(payload, config.refreshJwt as JwtConfigurationInterface, config.refreshJwt.audience as string);

  return { accessToken, refreshToken };
}
