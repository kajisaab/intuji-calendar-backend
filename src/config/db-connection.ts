import { databaseService } from '@config/db.config';
import type { Server } from 'http';
import AppLogger from '@core/logger';
import config from '.';

const logger = new AppLogger();
let RETRY_COUNT = 0;

async function dbConnection(server: Server): Promise<boolean> {
  try {
    const response = await databaseService.initialize();
    return response.isInitialized;
  } catch (err) {
    if (RETRY_COUNT < config.db.retryCount) {
      logger.error('Database connection failed. Retrying...');
    }
    if (RETRY_COUNT >= config.db.retryCount) {
      logger.error('Database connection failed after retrying');
      server.close(() => {
        process.exit();
      });
    }
    RETRY_COUNT++;
    await dbConnection(server);
    return false;
  }
}

export default dbConnection;
