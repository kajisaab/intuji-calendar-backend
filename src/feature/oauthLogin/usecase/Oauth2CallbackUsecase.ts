import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import axios from 'axios';
import type { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { GoogleOAuthCredentialDto } from '../dto/GoogleOAuthCredential.dto';
import { GoogleUserDetailsDto } from '../dto/GoogleUserDetails.dto';
import { databaseService } from '@config/db.config';
import { User } from '../entity/User.entity';
import { createToken } from '@core/auth/JwtStrategy';
import config from '@config/index';
import { JwtConfigurationInterface } from 'utils/jwtConfigInterface.interface';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { Oauth2CallbackResponseDto } from '../response/Oauth2CallbackResponse.dto';
import AppLogger from '@core/logger';

export default async function Oauth2CallbackUsecase(req: Request, res: Response, next: NextFunction): Promise<any> {
  const logger = new AppLogger();
  const GOOGLE_CLIENT_ID = '904229495190-qv1kut0ttlmdq8jse0g7n797ik1ee54f.apps.googleusercontent.com';
  const GOOGLE_CLIENT_SECRET = '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';
  const code = req.query.code;

  try {
    const redirectUrl = 'http://127.0.0.1:3000/v1/api/google/oauth2callback';

    const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUrl);

    const token_res = await oAuth2Client.getToken(code as string);
    await oAuth2Client.setCredentials(token_res.tokens);

    const credentials: GoogleOAuthCredentialDto = oAuth2Client.credentials;

    logger.log(`This is the credentials ${credentials}`);

    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: {
        Authorization: `Bearer ${credentials.access_token}`
      }
    });

    if (response.statusText === 'OK') {
      const userDetials: GoogleUserDetailsDto = response.data;

      const userEntityDto: User = {
        id: userDetials.sub,
        name: userDetials.name,
        profileImageUrl: userDetials.picture,
        refreshToken: credentials.refresh_token ?? null
      };

      logger.log(`This is the user Entity Dto ${userEntityDto}`);

      // Get the repository.

      const userRepository = databaseService.getRepository(User);

      // Check if the user already exists
      const result = await userRepository.update(userEntityDto.id, userEntityDto);

      if (result.affected === 0) {
        // If no rows were affected, it means the user did not exist and needs to be inserted
        const newUser = userRepository.create(userEntityDto);
        await userRepository.save(newUser);

        logger.log(`User saved to database : ${newUser}`);
      } else {
        logger.log(`User updated in database : ${userEntityDto}`);
      }

      const { accessToken, refreshToken } = generateAccessAndRefreshToken(userEntityDto);

      res.redirect(
        `http://localhost:5173/calendar?access_token=${encodeURIComponent(accessToken)}&google_access_token=${encodeURIComponent(
          credentials.access_token || ''
        )}&refresh_token=${encodeURIComponent(refreshToken)}`
      );
    } else {
      throw new BadRequestException('Error while logging through google oauth');
    }
  } catch (err) {
    logger.error(`Error on oauth callback usecase ${err}`);
    throw err;
  }
}

function generateAccessAndRefreshToken(payload: string | object | Buffer): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = createToken(payload, config.accessJwt as JwtConfigurationInterface, config.accessJwt.audience as string);
  const refreshToken = createToken(payload, config.refreshJwt as JwtConfigurationInterface, config.refreshJwt.audience as string);

  return { accessToken, refreshToken };
}
