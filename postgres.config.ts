import { User } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import * as dotenv from 'dotenv';
dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'ContentUsersDB',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 5432,
  username: 'postgres',
  password: 'postgres',
  entities: [User],
  synchronize: true,  // !! Development only, Not on production
};

export default config;
