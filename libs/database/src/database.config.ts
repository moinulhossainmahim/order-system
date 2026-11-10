import { DataSourceOptions } from 'typeorm';
import { Order } from './entities/order.entity';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'order_system',
  entities: [Order],
  synchronize: false,
};
