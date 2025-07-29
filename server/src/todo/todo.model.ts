import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    priority: { type: String, required: true },
    date: { type: String },
    completed: { type: Boolean, required: true },

    user: { type: mongoose.Schema.Types.String, ref: "User", required: true } 
})

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;