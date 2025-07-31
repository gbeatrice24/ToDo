import Todo from "../todo.model";

export async function insertTodoService(
  name: string,
  desc: string,
  priority: string,
  userId: string
) {
  const newTodo = new Todo({
    name: name,
    desc: desc,
    priority: priority,
    date: new Date(),
    done: false,

    user: userId,
  });

  return newTodo.save();
}
