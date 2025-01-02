import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    minlength: 5,
    maxlength: 255,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    maxlength: 1024,
  },
});

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWTPRIVATEKEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
