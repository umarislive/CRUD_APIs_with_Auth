import ExpressError from "../utils/ExpressError.js";
import task from "../validation/task.js";

export const validateTask = (req, res, next) => {
  const { error } = task.validate(req.body);
  if (error) return next(new ExpressError(400, error.details[0].message));
  next();
};
