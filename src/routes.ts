import { Router } from 'express';
import OauthController from '@feature/oauthLogin/controller';
import EventController from '@feature/events/eventsController';

const routes = Router();
// All user operations will be available under the "users" route prefix.

routes.use('/google', OauthController);

routes.use('/calendar', EventController);

export default routes;
