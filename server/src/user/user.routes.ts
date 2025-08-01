import { Router } from "express";
import { loginUser } from "./user.controller";

const router = Router();

router.post("/login", loginUser);

export default router;
