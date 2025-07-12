const validator = require("validator");

const validateSignupData = (req) => {
  const { name, email, password, role } = req.body;
  if (!name) {
    throw new Error("Name is required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  } else if (!role) {
    throw new Error("Role is required");
  }
};

module.exports = { validateSignupData };
