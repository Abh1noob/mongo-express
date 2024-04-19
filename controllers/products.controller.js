import product from "../models/products.models.js";

//Create Product - CREATE
export const createProduct = async (req, res) => {
  try {
    const products = await product.create(req.body);
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//Get Product By ID - READ
export const getProductByID = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await product.findById(id);
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//Get All Products - READ
export const getAllProducts = async (req, res) => {
  try {
    const products = await product.find({});
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//Update Product By ID - UPDATE
export const updateProduct = async (req, res) => {
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
};

//Delete Product - DELETE
export const deleteProduct = async (req, res) => {
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
};
