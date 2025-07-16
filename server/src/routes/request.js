const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { allowRole } = require("../middlewares/role");
const Request = require("../models/request");
const Food = require("../models/food");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:foodId",
  userAuth,
  allowRole("accepter"),
  async (req, res) => {
    try {
      const { foodId } = req.params;
      const loggedInUser = req.user;

      const food = await Food.findById(foodId);
      if (!food) {
        return res.status(404).send("Food not found");
      }

      const newRequset = new Request({
        food: foodId,
        accepter: loggedInUser._id,
      });

      const savedRequest = await newRequset.save();
      res.json({ message: "Food request sent", request: savedRequest });
    } catch (err) {
      res.status(500).send("Failed to send food request: " + err.message);
    }
  }
);

requestRouter.get(
  "/request/my",
  userAuth,
  allowRole("accepter"),
  async (req, res) => {
    try {
      const loggedInUser = req.user;

      const requests = await Request.find({
        accepter: loggedInUser._id,
      })
        .populate("food", "name")
        .populate("accepter", "name");

      res.json({ message: "My food requests: ", requests: requests });
    } catch (err) {
      res.status(500).send("Error fetching requests: " + err.message);
    }
  }
);

requestRouter.delete(
  "/request/cancel/:requestId",
  userAuth,
  allowRole("accepter"),
  async (req) => {
    try {
      const loggedInUser = req.user;
      const { requestId } = req.params;

      const deleteRequest = await Request.findOneAndDelete({
        _id: requestId,
        accepter: loggedInUser._id,
      });

      if (!deleteRequest) {
        res.status(404).send("Request not found");
      }

      res.json({
        message: "Request canceled successfully",
        deletedRequest: deleteRequest,
      });
    } catch (err) {
      res.status(500).send("Error canceling request: " + err.message);
    }
  }
);

module.exports = requestRouter;
