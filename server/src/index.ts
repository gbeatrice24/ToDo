import express from "express";
import {
  connectDB,
  createTestModels,
  getAllUsers,
  getAllTodos,
} from "@/database/db";

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.get("/", async (_req, res) => {
  await createTestModels();

  const users = await getAllUsers();
  console.log("Users:", users);

  const todos = await getAllTodos();
  console.log("Todos:", todos);

  res.send(":)");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
});
