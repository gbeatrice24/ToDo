import Todo from "../todo.model";

export async function updateTodoService(
  id: string,
  name: string,
  desc: string,
  priority: string
) {
  return await Todo.findByIdAndUpdate(
    id,
    { name, desc, priority },
    { new: true }
  );
}
