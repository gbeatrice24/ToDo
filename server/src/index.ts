import express from "express";
import cors from "cors";

import {
  connectDB,
  createTestModels,
  getAllUsers,
  getAllTodos,
} from "@/database/db";
import todoRoutes from "./todo/todo.routes";
import userRoutes from "./user/user.routes";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (_req, res) => {
  await createTestModels();

  const users = await getAllUsers();
  console.log("Users:", users);

  const todos = await getAllTodos();
  console.log("Todos:", todos);

  res.send(":)");
});

app.use("/api", todoRoutes);
app.use("/api", userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
});
