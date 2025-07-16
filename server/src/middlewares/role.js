const allowRole = async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    const allowedRole = "donor";
    if (loggedInUser.role !== allowedRole) {
      return res.status(403).send("Access denied: ONLY FOR DONOR");
    }

    next();
  } catch (err) {
    return res.status(500).send("Error: " + err.message);
  }
};

module.exports = { allowRole };
