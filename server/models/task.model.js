const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
  userID: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = { taskModel };
