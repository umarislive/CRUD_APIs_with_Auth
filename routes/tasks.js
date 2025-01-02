import express from 'express';
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import { allTasks, showTask, destroyTask, createTask, updateTask } from '../controllers/tasks.js';
import { auth } from '../middlewares/auth.js';
import { isAuthor } from '../middlewares/isAuthor.js';
import { validateTask } from '../middlewares/validateTask.js';

router
    .route("/")
    .get(allTasks)
    .post(validateTask, auth, wrapAsync(createTask));

router
    .route("/:id")
    .get(auth, wrapAsync(showTask))
    .put(validateTask, auth, isAuthor, wrapAsync(updateTask))
    .delete(auth, isAuthor, wrapAsync(destroyTask));

export default router;
