import Todo from "../todo.model";

export async function updateTodoEditingService(id: string, editState: boolean) {
  await Todo.updateMany({}, { $set: { editing: false } });

  return await Todo.findByIdAndUpdate(
    id,
    { editing: editState },
    { new: true }
  );
}
