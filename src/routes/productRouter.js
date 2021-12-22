import express from "express";
import {
  getProducts,
  createProduct,
  addFavorite,
  getFavorite,
} from "../controllers/ProductController.js";

const route = express.Router();

route.get("/", getProducts);
route.post("/create", createProduct);
route.post("/favorite/add", addFavorite);
route.post("/favorite", getFavorite);

export default route;
