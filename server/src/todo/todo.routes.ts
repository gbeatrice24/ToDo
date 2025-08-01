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

router.get("/", getTodos);
router.post("/", insertTodo);
router.put("/:id/update", updateTodo);
router.put("/:id/done", updateTodoDone);
router.put("/:id/editing", updateTodoEditing);
router.delete("/:id", deleteTodo);

export default router;
