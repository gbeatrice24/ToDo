import mongoose from "mongoose";

import Todo from "@/todo/todo.model";
import User from "@/user/user.model";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todoapp";

// connect to mongodb
export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", (err as Error).message);
  }
}

export async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getAllTodos() {
  try {
    const todos = await Todo.find();
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

////////////////////////////////////////////////////

// create test models
export async function createTestModels() {
  await User.deleteMany({});
  await Todo.deleteMany({});

  const testUser = new User({
    name: "testuser1",
    email: "test1@test.com",
    password: "testuser1",
  });

  await testUser.save();

  const testTodo = new Todo({
    name: "task1",
    desc: "task1 desc",
    priority: "Medium",
    date: new Date(),
    done: false,
    editing: false,
    user: testUser._id,
  });

  const testTodo2 = new Todo({
    name: "task2",
    desc: "task2 desc",
    priority: "High",
    date: new Date(),
    done: false,
    editing: false,
    user: testUser._id,
  });

  await testTodo.save();
  await testTodo2.save();
}
