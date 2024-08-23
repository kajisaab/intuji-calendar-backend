import axios from 'axios';
import type { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';

export default async function Oauth2CallbackUsecase(req: Request, res: Response, next: NextFunction): Promise<any> {
  const GOOGLE_CLIENT_ID = '904229495190-qv1kut0ttlmdq8jse0g7n797ik1ee54f.apps.googleusercontent.com';
  const GOOGLE_CLIENT_SECRET = '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';
  const code = req.query.code;

  try {
    const redirectUrl = 'http://127.0.0.1:3000/v1/api/google/oauth2callback';

    const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUrl);

    const res = await oAuth2Client.getToken(code as string);
    await oAuth2Client.setCredentials(res.tokens);
    console.log('Tokens acquired');
    const users = oAuth2Client.credentials;
    console.log('credentials', users);
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${users.access_token}`);
    console.log({ response });
  } catch (err) {
    console.log({ err });
  }
  return null;
}
