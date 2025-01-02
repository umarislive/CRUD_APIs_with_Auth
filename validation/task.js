import Joi from "joi";

const task = Joi.object({
  title: Joi.string().min(5).required(),
  description: Joi.string().min(5).required(),
  author: Joi.string().min(24).required(),
  due_date: Joi.date().greater("now").required(),
}).required();

export default task;
