const express = require("express");
require("dotenv").config();

const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { BlacklistModel } = require("../models/blacklist.model");

userRouter.post("/register", async (req, res) => {
  try {
    const { password, email, username, fullName } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists, please login" });
    } else {
      if (password.length < 3) {
        return res
          .status(400)
          .json({ msg: "Password should be at least 3 characters long" });
      }

      bcrypt.hash(password, 5, async (err, hash) => {
        if (hash) {
          const user = new UserModel({
            email,
            password: hash,
            username,
            fullName,
          });
          await user.save();
          return res.status(200).json({ msg: "Registration successful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userID: user._id, username: user.username },
          "masai"
        );

        const userWithoutPassword = {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          createdAt: user.createdAt,
        };

        return res
          .status(200)
          .json({ msg: "Login successful", token, user: userWithoutPassword });
      } else {
        return res.status(400).json({ msg: "Invalid password" });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (!token) {
      return res.status(400).json({ msg: "Token not provided" });
    }

    const blacklist = await BlacklistModel.findOne();

    if (blacklist) {
      await BlacklistModel.updateMany({}, { $push: { blacklist: [token] } });
    } else {
      const blacklistUser = new BlacklistModel({ blacklist: [token] });
      await blacklistUser.save();
    }

    return res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  userRouter,
};
