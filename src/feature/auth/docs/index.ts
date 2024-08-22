import login from './login';
import schemas from './schemas';
import signup from './signup';

export default {
  schemas,
  paths: {
    '/auth/login': { ...login },
    '/auth/signup': { ...signup }
  }
};
