import mongoose from "mongoose";

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
      reminders: {
        type: [Date],
        required: true,
      },
    },
  ],
});


export default mongoose.model ("TaskModel" ,taskSchema , "tasks")