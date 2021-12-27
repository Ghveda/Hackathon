import express from "express";
import {
  getProducts,
  createProduct,
  addFavorite,
  getFavorite,
  deleteProduct,
} from "../controllers/ProductController.js";

const route = express.Router();

route.get("/", getProducts);
route.post("/create", createProduct);
route.post("/favorite/add", addFavorite);
route.get("/favorite", getFavorite);
route.delete("/delete", deleteProduct);

export default route;
