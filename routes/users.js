import express from "express";
const router = express.Router();
import { signup } from "../controllers/users.js";
import { auth } from "../controllers/auth.js";
import wrapAsync from "../utils/wrapAsync.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateAuth } from "../middlewares/validateAuth.js";

router
    .route("/signup")
    .post(validateUser, wrapAsync(signup));
router
    .route("/login")
    .post(validateAuth, wrapAsync(auth));

export default router;