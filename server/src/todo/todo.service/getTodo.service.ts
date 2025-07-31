import Todo from "../todo.model";

// get todos
export async function getTodoService() {
  const todos = await Todo.find();

  return todos.map((todo) => ({
    id: todo._id.toString(),
    name: todo.name,
    desc: todo.desc,
    date: todo.date,
    priority: todo.priority,
    done: todo.done,
    editing: false,
  }));
}
