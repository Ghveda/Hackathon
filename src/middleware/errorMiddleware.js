const notFount = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, _, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  return res.json({
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : null,
    stack: err.stack,
  });
};

export { notFount, errorHandler };
