import AppLogger from '@core/logger';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { type Request, type Response } from 'express';
import { type SignupRequestDto } from '../request/SignupRequestDto.dto';
import { SignupResponse } from '../response/signupResponse.response';

const logger = new AppLogger();

async function SignupUsecase(req: Request, res: Response): Promise<Result<string>> {
  try {
    const requestBody: SignupRequestDto = req.body;

    const response = new SignupResponse('Successfully created user');
    return Result.createSuccess(response);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export default SignupUsecase;
