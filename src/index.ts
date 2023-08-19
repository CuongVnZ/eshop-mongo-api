import express, { Application } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoute from "./routes/user";
import authRoute from "./routes/auth";
import productRoute from "./routes/product";
import cartRoute from "./routes/cart";
import orderRoute from "./routes/order";
import stripeRoute from "./routes/stripe";

dotenv.config();

const app: Application = express();

async function connectDB() {
  return await mongoose
  .connect(process.env.MONGO_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Database Connected Successfully!"))
}

connectDB()
.then(() => {
  const port = process.env.PORT || 5000;

  app.use(cors());
  app.use(express.json());
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/products", productRoute);
  app.use("/api/carts", cartRoute);
  app.use("/api/orders", orderRoute);
  app.use("/api/checkout", stripeRoute);

  app.listen(port, () => {
    console.log("Backend server is running on port " + port + "!");
  });
})
.catch((err) => {
  console.log(err);
});