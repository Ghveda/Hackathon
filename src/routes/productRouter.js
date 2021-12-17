import express from "express";
import { getProducts } from "../controllers/ProductController.js";

const route = express.Router();

route.post("/", getProducts);

export default route;
