const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { allowRole } = require("../middlewares/role");
const Food = require("../models/food");
const Request = require("../models/request");

const foodRouter = express.Router();

foodRouter.post(
  "/food/create",
  userAuth,
  allowRole("donor"),
  async (req, res) => {
    try {
      const { name, quantity, expiry, description } = req.body;
      const loggedInUser = req.user;

      const newFood = new Food({
        name,
        quantity,
        expiry,
        description,
        donor: loggedInUser.id,
      });

      const savedFood = await newFood.save();

      res.json({
        message: "Fodd item added successfully",
        foodItem: savedFood,
      });
    } catch (err) {
      res.status(500).send("Error: Failed to add food ", err.message);
    }
  }
);

foodRouter.patch(
  "/food/edit/:foodId",
  userAuth,
  allowRole("donor"),
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { foodId } = req.params;

      const food = await Food.findOneAndUpdate(
        {
          _id: foodId,
          donor: loggedInUser.id,
        },
        req.body,
        { new: true }
      );
      if (!food) {
        return res.status(404).send("Food not Found");
      }
      res.json({
        message: "Fodd item updated successfully",
        updatedFood: food,
      });
    } catch (err) {
      res.status(500).send("Failed to update food: ", err.message);
    }
  }
);

foodRouter.delete(
  "/food/delete/:foodId",
  userAuth,
  allowRole("donor"),
  async (req, res) => {
    try {
      const { foodId } = req.params;
      const loggedInUser = req.user;

      const food = await Food.findOneAndDelete({
        _id: foodId,
        donor: loggedInUser.id,
      });
      if (!food) {
        return res.status(404).send("Food not found");
      }
      res.json({
        message: "Food item deleted successfully",
        deletedFood: food,
      });
    } catch (err) {
      res.status(500).send("Failed to delete food: ", err.message);
    }
  }
);

foodRouter.get("/food/my", userAuth, allowRole("donor"), async (req, res) => {
  try {
    const loggedInUser = req.user;

    const foods = await Food.find({
      donor: loggedInUser._id,
    });

    if (!foods) {
      return res.status(200).send("No food items");
    }

    res.json({ message: "All your food items", foodItems: foods });
  } catch (err) {
    res.status(500).send("Failed to fetch food items: " + err.message);
  }
});

foodRouter.get(
  "/food/request/received",
  userAuth,
  allowRole("donor"),
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const requests = await Request.find()
        .populate({
          path: "food",
          match: { donor: loggedInUser._id },
          populate: { path: "donor", select: "name" },
        })
        .populate("accepter", "name");

      const foodRequests = requests.filter((request) => request.food !== null);
      if (!foodRequests) {
        return res.status(200).send("No food requests received");
      }
      res.json({
        message: "Food requests received by you",
        foodRequests: foodRequests,
      });
    } catch (err) {
      res.status(500).send("Failed to fetch food requests: " + err.message);
    }
  }
);

foodRouter.post(
  "/food/request/:review/:requestId",
  userAuth,
  allowRole("donor"),
  async (req, res) => {
    try {
      const { requestId } = req.params;
      const loggedInUser = req.user;
      const { review } = req.params;

      const request = await Request.findById(requestId).populate("food");

      if (!request || !request.food) {
        return res.status(404).send("Request not found");
      }

      if (request.food.donor.toString() !== loggedInUser._id.toString()) {
        return res.status(403).send("You are not the donor of this food");
      }

      if (request.status !== "pending") {
        return res
          .status(400)
          .send(`Request already ${request.status}. Cannot change again.`);
      }

      request.status = review;
      const savedRequest = await request.save();
      res.json({ message: "Food request updated", request: savedRequest });
    } catch (err) {
      res.status(500).send("Failed to update food request: " + err.message);
    }
  }
);

foodRouter.get("/food/all", userAuth, async (req, res) => {
  try {
    const foods = await Food.find({
      isAvailable: true,
      expiry: { $gte: new Date() },
    }).populate("donor", "name");

    res.json({ message: "All food items", foodItems: foods });
  } catch (err) {
    res.status(500).send("Failed to fetch food items: " + err.message);
  }
});

foodRouter.get(
  "/get/food/:foodId",
  userAuth,
  allowRole("donor"),
  async (req, res) => {
    try {
      const { foodId } = req.params;

      const getFood = await Food.find({ _id: foodId });

      res.json({ message: "Food item fetched successfully", Item: getFood });
    } catch (err) {
      res.status(500).send("Failed to fetch food items: " + err.message);
    }
  }
);

module.exports = foodRouter;
