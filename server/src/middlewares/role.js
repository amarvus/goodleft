const allowRole = (role) => {
  return async (req, res, next) => {
    try {
      const loggedInUser = req.user;

      if (loggedInUser.role !== role) {
        return res
          .status(403)
          .send(`Access denied: Only ${role}s can access this`);
      }

      next();
    } catch (err) {
      res.status(500).send("Role check failed: " + err.message);
    }
  };
};

module.exports = { allowRole };
