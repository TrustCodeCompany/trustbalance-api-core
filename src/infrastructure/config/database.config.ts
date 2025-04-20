import { config } from 'dotenv';
import * as process from 'node:process';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
config({ path: envFile });

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // solo para dev
  logging: false,
  /*entities: ['src/infrastructure/persistence/entities/*.entity{.ts,.js}'],*/
  entities: [
    __dirname + '/../../infrastructure/persistence/entities/*.entity{.ts,.js}',
  ],
  subscribers: [],
  migrations: [],
  ssl: process.env.NODE_ENV === 'production',
};
