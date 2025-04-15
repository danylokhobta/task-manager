import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware.js"; 
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerConfig.js"; // Import Swagger configuration
import './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5000', // Development backend
  'http://localhost:5173', // Development frontend
  'https://task-manager-spn5.onrender.com', // Production frontend
  'https://backend-dg9f.onrender.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent with requests
};

// Middleware Setup
app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS middleware globally
app.use(cookieParser());

// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);

// Set middleware of CORS 
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    ...allowedOrigins
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});

export default app;