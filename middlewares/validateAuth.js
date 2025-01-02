import auth from "../validation/auth.js";

export const validateAuth = (req, res, next) => {
  const { error } = auth.validate(req.body);
  if (error) return next(400, error.details[0].message);
  next();
};
