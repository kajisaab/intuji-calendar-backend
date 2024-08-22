import AppLogger from '@core/logger';
import http from 'http';
import 'module-alias/register';
import config from './config';
import app from 'app';
import dbConnection from '@config/db-connection';

const logger = new AppLogger();

const server = http.createServer(app);

dbConnection(server)
  .then(async (res: boolean) => {
    logger.log('Successfully Database connected');
    if (res) {
      server.listen(config.port, (): void => {
        logger.log(`Server start at port ${config.port}`);
      });
    }
  })
  .catch((err) => {
    logger.error(err);
  });
