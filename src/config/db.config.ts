import { DataSource } from 'typeorm';
import config from '.';

export const databaseService = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: +config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: true,
  entities: ['src/feature/**/*.entity.ts'],
  subscribers: [],
  migrations: ['src/migrations/**/*.ts']
});
