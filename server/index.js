const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { userRouter } = require("./routes/user.routes");
const { taskRouter } = require("./routes/task.routes");
const { connection } = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.json("Hello WORLD");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log(`port running at ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});
