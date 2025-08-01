import Todo from "./todo.model";

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

// insert todo
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
    editing: false,

    user: userId,
  });

  return newTodo.save();
}

// update todo
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

// update done
export async function updateTodoDoneService(id: string, doneState: boolean) {
  return await Todo.findByIdAndUpdate(id, { done: doneState });
}

// update editing
export async function updateTodoEditingService(id: string, editState: boolean) {
  await Todo.updateMany({}, { $set: { editing: false } });

  return await Todo.findByIdAndUpdate(
    id,
    { editing: editState },
    { new: true }
  );
}

// delete todo
export async function deleteTodo(id: string) {
  return await Todo.findByIdAndDelete(id);
}
