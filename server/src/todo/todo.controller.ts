import { Request, Response } from "express";
import Todo from "./todo.model";
import { getTodoService } from "./todo.service/getTodo.service";
import { insertTodoService } from "./todo.service/insertTodo.service";
import { updateTodoService } from "./todo.service/updateTodo.service";
import { updateTodoDoneService } from "./todo.service/updateTodoDone.service";
import { updateTodoEditingService } from "./todo.service/updateTodoEditing.service";

export async function getTodos(req: Request, res: Response) {
  try {
    const todos = await getTodoService();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
}

// insert todo
export async function insertTodo(req: Request, res: Response) {
  const { name, desc, priority, userId } = req.body;
  try {
    const savedTodo = await insertTodoService(name, desc, priority, userId);

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
  const { id } = req.params;
  const { name, desc, priority } = req.body;
  try {
    const updatedTodo = await updateTodoService(id, name, desc, priority);

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
  const { id } = req.params;
  const { doneState } = req.body;
  try {
    const updatedTodo = await updateTodoDoneService(id, doneState);

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
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
}

export async function updateTodoEditing(req: Request, res: Response) {
  const { id } = req.params;
  const { editState } = req.body;

  try {
    await Todo.updateMany({}, { $set: { editing: false } });

    const updatedTodo = await updateTodoEditingService(id, editState);

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
      editing: editState,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
}

export async function deleteTodo(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
    console.log("error", err);
  }
}
