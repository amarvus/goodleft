const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Please login to continue");
    }

    const decodeObj = jwt.verify(token, "good@left");
    const { _id } = decodeObj;

    const user = await User.findOne(_id);
    if (!user) {
      throw new Error("User does not exist");
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);

    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { userAuth };
