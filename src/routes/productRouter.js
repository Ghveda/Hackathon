import express from "express";
import {
  getProducts,
  createProduct,
  addFavorite,
} from "../controllers/ProductController.js";

const route = express.Router();

route.post("/", getProducts);
route.post("/create", createProduct);
route.post("/favorite/add", addFavorite);

export default route;
