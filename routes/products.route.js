import express from "express";

import {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getProductByID/:id", getProductByID);
router.post("", createProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;