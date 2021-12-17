import mongoose from "mongoose";

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
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
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
