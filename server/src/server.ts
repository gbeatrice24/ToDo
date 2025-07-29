import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Todo from "@/todo/todo.model";
import User from "@/user/user.model";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todoapp";

app.use(express.json());

// connect to mongodb
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.get("/", (_req, res) => {
  createTestModels();
  res.send(":)");
});

async function createTestModels() {
  await User.deleteMany({});
  await Todo.deleteMany({});

  const testUser = new User({
    _id: "1",
    name: "testuser1",
    email: "test1@test.com",
    password: "p",
  });

  testUser.save();

  getAllUsers().then((users) => {
    users.forEach((user) => {
      console.log(user);
    });
  });

  const testTodo = new Todo({
    _id: "1",
    title: "task1",
    desc: "task1 desc",
    priority: "High",
    date: "25-1-1",
    completed: false,
    user: testUser._id,
  });

  testTodo.save();

  getAllTodos().then((todos) => {
    todos.forEach((todo) => {
      console.log(todo);
    });
  });
}

async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function getAllTodos() {
  try {
    const todos = await Todo.find();
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}
