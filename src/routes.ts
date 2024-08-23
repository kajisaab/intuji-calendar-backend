import { Router } from 'express';
import OauthController from '@feature/oauthLogin/controller';
const routes = Router();
// All user operations will be available under the "users" route prefix.

routes.use('/google', OauthController);

export default routes;
