import Joi from "joi";

const user = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(255).lowercase().required().email(),
  password: Joi.string().min(8).max(24).required(),
}).required();

export default user;
