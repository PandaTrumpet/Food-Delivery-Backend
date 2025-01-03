import createHttpError from "http-errors";
import foodModel from "../models/FoodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({
      success: true,
      message: "Food added",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};
// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (foods.length === 0) {
      throw createHttpError(404, "There is no food available!");
    }
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    const errorMessage = error.message || "Internal Server Error";

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }
};
// remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      throw Error(401);
    }
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Food removed!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error!",
    });
  }
};
export { addFood, listFood, removeFood };
