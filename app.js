import dotenv from "dotenv";
dotenv.config();

import { errorHandler } from "./middlewares/errorHandler.js";
import ExpressError from "./utils/ExpressError.js";
import tasks from "./routes/tasks.js";
import users from "./routes/users.js";
import mongoose from "mongoose";
import express from "express";
const app = express();

const DB_URL = process.env.MONGO_URL;
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB...", err);
  });

app.use(express.json());
app.use("/api/tasks", tasks);
app.use("/api/users", users);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listening to port: ${port}`);
});
