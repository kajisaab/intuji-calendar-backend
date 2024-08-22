import { type RowDataPacket } from 'mysql2';
import { AppDataSource } from '@config/db.config';
import snakeToCamel from './snakeToCamelCase';
import { DatabaseError } from '@core/middleware/errorHandler/databaseError';
import AppLogger from '@core/logger';

const executeQuery = async (sqlQuery: string, values?: any[]): Promise<any> => {
  const logger = new AppLogger();
  try {
    const results: Array<Record<string, any>> | Record<string, any> = await AppDataSource.manager.query<RowDataPacket[]>(sqlQuery, values);

    if (Array.isArray(results) && results.length < 2) {
      return results.map((data: Record<string, any>) => snakeToCamel(data));
    }
    if (!Array.isArray(results)) {
      return snakeToCamel(results);
    }

    return results.map((dat: Record<string, any>) => snakeToCamel(dat));
  } catch (error) {
    logger.error(error);
    throw new DatabaseError(`Error while executing ${sqlQuery}`);
  }
};

export default executeQuery;
