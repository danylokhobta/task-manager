import { decodeAccessToken } from '@/utils';
import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"]; // Get the token from headers
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: Access token not found" });
    return;
  }

  const token = authHeader.split(" ")[1]; // Extract the token part

  try {
    const decoded = decodeAccessToken(token);
    req.user = decoded; // Store user data in `req.user`
    next(); // Move to the next middleware or route handler
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Access token expired" });
      } else if (error.name === "JsonWebTokenError") {
        res.status(403).json({ message: "Invalid access token" });
      } else {
        next(error); // Pass unexpected errors to the error handler
      }
    } else {
      next(error); // Pass unknown errors to the error handler
    }
  }
};
