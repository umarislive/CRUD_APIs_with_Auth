import Task from "../models/task.js";

export const allTasks = async (req, res) => {
  const { status, dueDate } = req.query;

  const filters = {};
  if (status) filters.status = status;
  if (dueDate) filters.due_date = dueDate;

  const getTasks = await Task.find(filters);
  console.log(getTasks);
  res.send(getTasks);
};

export const showTask = async (req, res) => {
  let { id } = req.params;
  const getTask = await Task.findById(id);
  console.log(getTask);
  res.send(getTask);
};

export const createTask = async (req, res) => {
  const newTask = new Task(req.body);
  const result = await newTask.save();
  console.log(result);
  res.send(result);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );
  console.log(updatedTask);
  res.send(updatedTask);
};

export const destroyTask = async (req, res) => {
  let { id } = req.params;
  const getTask = await Task.findByIdAndDelete(id);
  console.log(getTask);
  res.send(getTask);
};
