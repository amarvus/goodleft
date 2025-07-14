const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Food = require("../models/food");

const foodRouter = express.Router();

foodRouter.post("/food/create", userAuth, async (req, res) => {
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

    res.json({ message: "Fodd item added successfully", foodItem: savedFood });
  } catch (err) {
    res.status(500).send("Error: Failed to add food ", err.message);
  }
});

foodRouter.patch("/food/edit/:foodId", userAuth, async (req, res) => {
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
    res.json({ message: "Fodd item updated successfully", updatedFood: food });
  } catch (err) {
    res.status(500).send("Failed to update food: ", err.message);
  }
});

foodRouter.delete("/food/delete/:foodId", userAuth, async (req, res) => {
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
    res.json({ message: "Food item deleted successfully", deletedFood: food });
  } catch (err) {
    res.status(500).send("Failed to delete food: ", err.message);
  }
});
