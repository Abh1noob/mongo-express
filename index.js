import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import product from "./models/product.models.js";

dotenv.config();

const uri = process.env.MONGO_URI;
const app = express();

app.use(express.json());

const ConnectDB = async () => {
  try {
    const response = await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Connection to MongoDB failed:", e);
  }
};

ConnectDB();

//************************************************ Routes ************************************************//

//Ping
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

//Create Product - CREATE
app.post("/api/products", async (req, res) => {
  try {
    const products = await product.create(req.body);
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


//Get Product By ID - READ
app.get("/api/getProductByID/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await product.findById(id);
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Get All Products - READ
app.get("/api/getAllProducts", async (req, res) => {
  try {
    const products = await product.find({});
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Update Product By ID - UPDATE
app.put("/api/updateProduct/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await product.findByIdAndUpdate(id, req.body);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Delete Product - DELETE
app.delete("/api/deleteProduct/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await product.findByIdAndDelete(id);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//************************************************ Routes ************************************************//


app.listen(3000, () => {
  console.log("server is running");
});
