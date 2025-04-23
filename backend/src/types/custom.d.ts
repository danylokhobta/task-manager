// src/types/custom.d.ts or a similar file
import { User } from './models/User'; // Adjust the path based on where your User model is

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: number;
    }
  }
}