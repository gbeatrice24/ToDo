import { Router } from "express";
import { getTodos } from "./todo.controller";

const router = Router();

router.get("/todos", getTodos);

export default router;
