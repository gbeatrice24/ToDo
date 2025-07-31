import Todo from "../todo.model";

export async function deleteTodo(id: string) {
  return await Todo.findByIdAndDelete(id);
}
