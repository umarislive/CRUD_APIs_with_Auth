export const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong!!!" } = err;
  res.status(statusCode).send(message);
};
