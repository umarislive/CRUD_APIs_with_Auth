import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";

export const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return next(new ExpressError(401, "Access denied. No token provided."));

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (ex) {
    return next(new ExpressError(400, "Invalid token"));
  }
};
