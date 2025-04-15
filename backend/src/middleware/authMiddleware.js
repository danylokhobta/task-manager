import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Get the token from headers
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Access token not found" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET); // Verify token
    req.user = decoded; // Store user data in `req.user`
    next(); // Move to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid access token" });
    } else {
      next(error);
    }
  }
};