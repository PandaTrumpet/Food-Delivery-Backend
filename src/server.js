import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRouet.js";
import orderRouter from "./routes/orderRoute.js";
// app config
const app = express();

const PORT = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("API WORKING");
}); //http method
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
