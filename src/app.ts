import shouldCompress from '@config/compressionConfiguration';
import corsOptions from '@config/corsConfiguration';
import requestInterceptor from '@core/middleware/RequestHandler/requestInterceptor';
import { responseInterceptor } from '@core/middleware/ResponseHandler/responseHandler';
import compression from 'compression';
import cors from 'cors';
import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import config from './config';
import routes from 'routes';
import swaggerDocs from '@config/swagger';
import { NotFoundError } from '@core/middleware/errorHandler/notFoundError';
import errorHandler from '@core/middleware/errorHandler';

const app = express();

/**
 * PARSE JSON BODIES TO THE OBJECT
 */
app.use(express.json());

/**
 * PARSE URL-ENCODED BODIES TO PLAIN TEXT
 */
app.use(express.urlencoded({ extended: true }));

/**
 * REQUEST MIDDLEWARE TO MODIFY THE REQUEST
 */
app.use(requestInterceptor);

/**
 * DEFINE CORS OPTIONS
 */
app.use(cors(corsOptions));

/**
 * HANDLE SWAGGER DOCUMENTATION
 * Note: Swagger documentation should always be before the helmet.
 */
swaggerDocs(app, Number(config.port));

/**
 * SECURITY PURPOSE
 */
app.use(helmet());

/**
 * COMPRESS THE RESPONSE
 */
app.use(compression({ filter: shouldCompress }));

/**
 * HANDLE THE ROUTES.
 */
app.use(`/${config.version}/` + config.prefix, routes);

/**
 * HANDLE UNDEFINED ROUTES.
 */
app.use('*', (req: Request, res: Response) => {
  throw new NotFoundError(`The requested API route ${req.originalUrl} does not exist`);
});

/**
 * RESPONSE MIDDLEWARE TO MODIFY THE RESPONSE MAINLY USED TO SEND TOKEN TO THE CLIENT USING COOKIE OR ON HEADER
 */
app.use(responseInterceptor);

/**
 * ERROR HANDLING
 */
app.use(errorHandler);

export default app;
