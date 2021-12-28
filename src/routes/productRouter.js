import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  addFavorite,
  getFavorite,
  deleteProduct,
  deleteFavorite,
} from "../controllers/ProductController.js";

const route = express.Router();

route.get("/", getProducts);
route.get("/product", getProduct);
route.post("/create", createProduct);
route.post("/favorite/add", addFavorite);
route.get("/favorite", getFavorite);
route.delete("/delete", deleteProduct);
route.delete("/deletefav", deleteFavorite);

export default route;
