import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://dsavontrumpet:pandatrumpet@cluster0.il8cf.mongodb.net/FoodDelivery"
      )
      .then(() => console.log("Mongo connection successfully established!"));
  } catch (error) {
    console.log("Error while setting up mongo connection", e);
    throw e;
  }
};
