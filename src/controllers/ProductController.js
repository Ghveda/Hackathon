import Product from "../models/productModel.js";
import Image from "../models/imageModel.js";

const getProducts = (_, res, next) => {
  try {
    const product = Product.find({}).exec();
    if (product) {
      res.json({
        products: product,
      });
    }
    next({
      status: 404,
      message: "There is no data",
    });
  } catch (error) {
    next({
      status: 404,
      message: `Error in products: ${error}`,
    });
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      userId,
      title,
      description,
      price,
      ammount,
      rating,
      category,
      images,
    } = req.body;

    const image = await Image.create({
      images,
    });

    if (!image) {
      throw new Error("Image error");
    }

    const product = await Product.create({
      userId,
      title,
      description,
      price,
      ammount,
      rating,
      category,
      imageId: image._id,
    });
    if (!product) {
      throw new Error("Product error");
    }

    res.json({
      product,
      image: image.images,
    });
  } catch (error) {
    next({
      status: 404,
      message: `Error in creation: ${error}`,
    });
  }
};

export { getProducts, createProduct };
