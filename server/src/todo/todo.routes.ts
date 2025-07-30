import { Router } from "express";
import { getTodos, insertTodo, updateTodo } from "./todo.controller";

const router = Router();

router.get("/todos", getTodos);
router.post("/todos", insertTodo);
router.put("/todos", updateTodo);

export default router;
