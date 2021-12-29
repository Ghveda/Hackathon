import mongoose from "mongoose";
import { image } from "../constants.js";

const productSchema = new mongoose.Schema({
  primaryImage: {
    type: String,
    default: image[0],
  },
  imageList: {
    type: Array,
    default: null,
  },
});

const Image = mongoose.model("Image", productSchema);

export default Image;
