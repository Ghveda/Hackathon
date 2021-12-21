import mongoose from "mongoose";
import { image } from "../constants.js";

const productSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  primaryImage: {
    type: String,
    default: image[0],
  },
  imageList: {
    type: Array,
    default: null,
  },
  price: {
    type: Number,
    required: true,
  },
  ammount: {
    type: Number,
    default: 1,
  },
  rating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;