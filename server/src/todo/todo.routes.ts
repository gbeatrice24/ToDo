import { Router } from "express";
import {
  getTodos,
  insertTodo,
  updateTodo,
  updateTodoDone,
  updateTodoEditing,
} from "./todo.controller";

const router = Router();

router.get("/todos", getTodos);
router.post("/todos", insertTodo);
router.put("/todos", updateTodo);
router.put("/todos/updateDone", updateTodoDone);
router.put("/todos/updateEditing", updateTodoEditing);

export default router;
