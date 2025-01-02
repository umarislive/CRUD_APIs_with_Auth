import Joi from "joi";

const auth = Joi.object({
  email: Joi.string().min(5).max(255).lowercase().required().email(),
  password: Joi.string().min(8).max(24).required(),
}).required();

export default auth;
