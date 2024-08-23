import { asyncHandler } from '@core/middleware/ResponseHandler/asyncHandler';
import { Router } from 'express';
import GetOauthUrlUsecase from '../usecase/GetOauthUrlUsecase';
import Oauth2CallbackUsecase from '../usecase/Oauth2CallbackUsecase';

const router = Router();

router.post('/getUrl', asyncHandler(GetOauthUrlUsecase));

router.get('/oauth2callback', asyncHandler(Oauth2CallbackUsecase));
export default router;
