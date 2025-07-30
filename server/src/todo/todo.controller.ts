import { Request, Response } from "express";
import Todo from "./todo.model";

// GET todos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();

    const mappedTodos = todos.map((todo) => ({
      id: todo._id.toString(),
      name: todo.name,
      desc: todo.desc,
      date: todo.date,
      priority: todo.priority,
      done: todo.done,
      editing: false,
    }));

    res.status(200).json(mappedTodos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};
