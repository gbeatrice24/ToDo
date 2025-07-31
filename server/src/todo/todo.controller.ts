import { Request, Response } from "express";
import Todo from "./todo.model";

// get todos
export async function getTodos(req: Request, res: Response) {
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
}

// insert todo
export async function insertTodo(req: Request, res: Response) {
  const { name, desc, priority, userId } = req.body;
  try {
    const newTodo = new Todo({
      name: name,
      desc: desc,
      priority: priority,
      date: new Date(),
      done: false,

      user: userId,
    });

    const savedTodo = await newTodo.save();
    res.status(200).json({
      id: savedTodo._id.toString(),
      name: savedTodo.name,
      desc: savedTodo.desc,
      date: savedTodo.date,
      priority: savedTodo.priority,
      done: savedTodo.done,
      editing: false,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to insert todo" });
  }
}

export async function updateTodo(req: Request, res: Response) {
  const { id, name, desc, priority } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { name, desc, priority },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({
      id: updatedTodo._id.toString(),
      name: updatedTodo.name,
      desc: updatedTodo.desc,
      date: updatedTodo.date,
      priority: updatedTodo.priority,
      done: updatedTodo.done,
      editing: false,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
}

export async function updateTodoDone(req: Request, res: Response) {
  const { id, doneState } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { done: doneState },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({
      id: updatedTodo._id.toString(),
      name: updatedTodo.name,
      desc: updatedTodo.desc,
      date: updatedTodo.date,
      priority: updatedTodo.priority,
      done: doneState,
      editing: false,
    });
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
}
