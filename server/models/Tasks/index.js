import mongoose from "mongoose";

let subSchema = new mongoose.Schema(
  {
    jobTime: {
      type: Date,
    },
    jobId: {
      type: String,
    },
  },
  { _id: false }
);

let taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  tasks: [
    {
      taskName: {
        type: String,
        required: true,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
      deadline: {
        type: Date,
        required: true,
      },
      reminders: [subSchema],
    },
  ],
});

export default mongoose.model("TaskModel", taskSchema, "tasks");
