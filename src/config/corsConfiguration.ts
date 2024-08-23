import { CorsError } from '@core/middleware/errorHandler/corsError';

/**
 * DEFINE ALLOWED ORIGINS
 */
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'https://oauth2.googleapis.com/token'];

/**
 * DEFINE CORS OPTIONS
 */
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, origin?: boolean | string | RegExp | Array<boolean | string | RegExp>) => void) {
    // Check if the origin is included in the allowed origins array.
    if (origin !== undefined || origin !== '' || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new CorsError('Sorry!, you do not have access'));
    }
  },
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

export default corsOptions;
