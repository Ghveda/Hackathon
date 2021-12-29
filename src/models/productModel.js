import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
  imageId: {
    type: mongoose.Types.ObjectId,
    ref: "Image",
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
