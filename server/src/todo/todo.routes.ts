import { Router } from "express";
import {
  getTodos,
  insertTodo,
  updateTodo,
  updateTodoDone,
  updateTodoEditing,
  deleteTodo,
} from "./todo.controller";

const router = Router();

router.get("/todos", getTodos);
router.post("/todos", insertTodo);
router.put("/todos/:id/update", updateTodo);
router.put("/todos/:id/done", updateTodoDone);
router.put("/todos/:id/editing", updateTodoEditing);
router.delete("/todos/:id", deleteTodo);

export default router;
