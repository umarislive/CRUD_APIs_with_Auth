import _ from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ExpressError from "../utils/ExpressError.js";

export const signup = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return next(new ExpressError(400, "User already resgistered."));

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.genAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
};
