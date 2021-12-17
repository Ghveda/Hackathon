import Product from "../models/productModel.js";

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

const createProduct = (req, res, next) => {
  const { userId, title, description, price, ammount, rating, category } =
    req.body;
};

export { getProducts };
