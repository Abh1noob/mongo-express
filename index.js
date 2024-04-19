import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import product from "./routes/products.route.js";


dotenv.config();

const uri = process.env.MONGO_URI;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", product);

const ConnectDB = async () => {
  try {
    const response = await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Connection to MongoDB failed:", e);
  }
};

ConnectDB();

//Ping
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});


app.listen(3000, () => {
  console.log("server is running");
});
