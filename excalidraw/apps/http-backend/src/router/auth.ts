import express, { Router } from "express";
import { signinController, signupController } from "../controller/auth";
const router: Router = express.Router();

router.post("/signup", signupController);
router.post("/signin", signinController);

export default router;
