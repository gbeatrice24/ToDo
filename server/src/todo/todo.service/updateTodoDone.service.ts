import Todo from "../todo.model";

export async function updateTodoDoneService(id: string, doneState: boolean) {
  return await Todo.findByIdAndUpdate(id, { done: doneState });
}
