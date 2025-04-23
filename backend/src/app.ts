import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors, { CorsOptions } from "cors";
import errorMiddleware from "@/middleware/errorMiddleware"; 
import '@/db/db.js';
import { createNestApp } from './main.nest';

dotenv.config();

const app = express();
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:5173',
  'https://task-manager-spn5.onrender.com',
  'https://backend-dg9f.onrender.com',
];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// Middleware Setup
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Mount NestJS app for UserModule
createNestApp(app).then(() => {
  console.log('✅ NestJS UserModule initialized');
}).catch((err) => {
  console.error('❌ Failed to initialize NestJS UserModule:', err);
});

app.use(errorMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Task Manager API!');
});

export default app;