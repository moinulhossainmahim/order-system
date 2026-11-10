import { DataSource } from 'typeorm';
import { databaseConfig } from './database.config';

// Used ONLY by the TypeORM CLI (migration:generate / run / revert).
export default new DataSource({
  ...databaseConfig,
  migrations: ['libs/database/src/migrations/*.ts'],
});
