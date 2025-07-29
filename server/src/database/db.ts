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
    password: "p",
  });

  testUser.save();

  const testTodo = new Todo({
    title: "task1",
    desc: "task1 desc",
    priority: "High",
    date: "25-1-1",
    completed: false,
    user: testUser._id,
  });

  testTodo.save();
}
