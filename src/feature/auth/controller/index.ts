/* eslint-disable @typescript-eslint/no-misused-promises */
import { asyncHandler } from '@core/middleware/ResponseHandler/asyncHandler';
import { Router } from 'express';
import LoginUsecase from '../usecase/login.usecase';
import { validate } from '@core/validation';
import { userLoginSchema } from '../validationSchema/useLogin.validation';
import SignupUsecase from '../usecase/signup.usecase';
import { userSignupSchema } from '../validationSchema/userSignup.validation';

const router = Router();

router.post('/login', validate(userLoginSchema), asyncHandler(LoginUsecase));

router.post('/signup', validate(userSignupSchema), asyncHandler(SignupUsecase));

export default router;
