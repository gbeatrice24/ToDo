import { Router } from "express";
import {
  getTodos,
  insertTodo,
  updateTodo,
  updateTodoDone,
} from "./todo.controller";

const router = Router();

router.get("/todos", getTodos);
router.post("/todos", insertTodo);
router.put("/todos", updateTodo);
router.put("/todos/updateDone", updateTodoDone);

export default router;
