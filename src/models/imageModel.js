import mongoose from "mongoose";
import { image } from "../constants.js";

const imageSchema = mongoose.Schema({
  images: {
    type: Array,
    default: image,
  },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
