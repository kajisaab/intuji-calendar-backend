import config from '@config/index';
import { OAuth2Client } from 'google-auth-library';

const oAuth2Client = new OAuth2Client(config.google.client_id, config.google.client_secret, config.google.redirect_url);

export { oAuth2Client };
