const express = require("express");
const { taskModel } = require("../models/task.model");
const { auth } = require("../middleware/auth.middleware");

const taskRouter = express.Router();

// post
taskRouter.post("/add", auth, async (req, res) => {
  const { userID } = req.body;

  try {
    const data = new taskModel({ ...req.body, userID });
    await data.save();
    res.status(200).json({ msg: "Task added successfully", data });
  } catch (err) {
    res.status(400).json({ error: "Failed to add task", msg: err.message });
  }
});

// get

taskRouter.get("/", auth, async (req, res) => {
  const { page } = req.query;
  const limit = 10;
  const skip = (page - 1) * limit;
  const { userID } = req.body;

  try {
    const data = await taskModel
      .find({ userID })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({ msg: "Tasks retrieved successfully", data });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to retrieve tasks", msg: err.message });
  }
});

// patch
taskRouter.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  const abc = await taskModel.findOne({ _id: id });

  try {
    if (req.body.userID == abc.userID) {
      await taskModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).json({ msg: "Task updated successfully" });
    } else {
      res
        .status(403)
        .json({
          error: "Unauthorized",
          msg: "User not authorized to update this task",
        });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to update task", msg: err.message });
  }
});

// DELETE
taskRouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  const abc = await taskModel.findOne({ _id: id });

  try {
    if (req.body.userID == abc.userID) {
      await taskModel.findByIdAndDelete({ _id: id }, req.body);
      res.status(200).json({ msg: "Task deleted successfully" });
    } else {
      res
        .status(403)
        .json({
          error: "Unauthorized",
          msg: "User not authorized to delete this task",
        });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to delete task", msg: err.message });
  }
});

module.exports = {
  taskRouter,
};
