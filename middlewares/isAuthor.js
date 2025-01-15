import jwt from "jsonwebtoken";
import Task from "../models/task.js";
import ExpressError from "../utils/ExpressError.js";

export const isAuthor = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return next(new ExpressError(401, "Access denied. No token provided."));

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const userId = decoded._id;
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return next(new ExpressError(404, "Task not found!"));
    }
    if (task.author.toString() !== userId) {
      return next(new ExpressError(403, "Access denied. Invalid token."));
    }
    next();
  } catch (ex) {
    return next(new ExpressError(400, "Invalid token."));
  }
};
