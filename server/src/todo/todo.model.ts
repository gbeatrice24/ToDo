import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  priority: { type: String, required: true },
  date: { type: Date },
  done: { type: Boolean, required: true },
  editing: { type: Boolean, required: true },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
