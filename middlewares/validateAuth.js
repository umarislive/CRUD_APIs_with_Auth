import auth from "../validation/auth.js";
import ExpressError from "../utils/ExpressError.js";

export const validateAuth = (req, res, next) => {
  const { error } = auth.validate(req.body);
  if (error) return next(new ExpressError(400, error.details[0].message));
  next();
};
