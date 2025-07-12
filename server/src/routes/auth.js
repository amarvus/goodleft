const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  console.log(req.body);

  try {
    // validate signup data
    validateSignupData(req);

    const { name, email, password, role } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: passwordHash,
      role,
    });
    console.log(user);

    const savedUser = await user.save();

    const token = jwt.sign({ id: savedUser._id }, "good@left", {
      expiresIn: "1h",
    });
    res.cookie("token", token, { expiresIn: "1h" });
    res.json({ message: "User created successfully!", user: savedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = authRouter;
