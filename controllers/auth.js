import bcrypt from "bcrypt";
import User from "../models/user.js";
import ExpressError from "../utils/ExpressError.js";

export const auth = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ExpressError(400, "Invalid email or password"));

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return next(new ExpressError(400, "Invalid email or password"));

  const token = user.genAuthToken();
  res.send(token);
};
