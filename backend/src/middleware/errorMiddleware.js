const errorMiddleware = (err, req, res, next) => {
  console.error(err); // Logs error for debugging

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ message });
};

export default errorMiddleware;