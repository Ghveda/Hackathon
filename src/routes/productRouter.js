import express from "express";
import {
  getProducts,
  createProduct,
} from "../controllers/ProductController.js";

const route = express.Router();

route.post("/", getProducts);
route.post("/create", createProduct);

export default route;
