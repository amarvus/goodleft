const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { allowRole } = require("../middlewares/role");
const Food = require("../models/food");

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

module.exports = foodRouter;
