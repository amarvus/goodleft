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

    const data = await User.findOne({ email });
    if (data) {
      throw new Error("Email is already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: passwordHash,
      role,
    });

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

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists or not?
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // create a jwt token
      const token = jwt.sign({ id: user._id }, "good@left", {
        expiresIn: "1h",
      });

      // add the token to cookie
      res.cookie("token", token, { expiresIn: "1h" });
      res.json({ message: "Login Successful", user: user });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error: ", err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout Successful");
});

module.exports = authRouter;
