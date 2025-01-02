import user from "../validation/user.js";

export const validateUser = (req, res, next) => {
  const { error } = user.validate(req.body);
  if (error) return next(400, error.details[0].message);
  next();
};
