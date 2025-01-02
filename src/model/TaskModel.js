import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskAssignUser: {
      type: String,
      required: true,
    },
    authorId: { 
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    Priority: {
      type: String,
      enum: ["high", "low", "in_progress"],
      required: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", taskSchema);
export default TaskModel;
