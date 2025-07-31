import { Router } from "express";
import { loginUser, signupUser } from "./user.controller";

const router = Router();

router.post("/user/login", loginUser);
router.post("/user/signup", signupUser)

export default router;
