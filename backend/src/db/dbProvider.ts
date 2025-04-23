import { Pool } from 'pg';

export const dbProvider = {
  provide: 'PG_POOL',
  useFactory: () => {
    return new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
    });
  },
};