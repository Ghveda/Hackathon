import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const getProducts = async (req, res, next) => {
  try {
    let { skip = 0, limit = 5, category } = req.query;
    let product, ammount, productLength;

    let where = {};

    if (category) {
      where.category = category;
    }

    productLength = await Product.find(where).count();
    product = await Product.find(where).skip(skip).limit(limit).exec();

    if (!product) {
      throw new Error("NOT_FOUND");
    }

    ammount = productLength - (skip + limit);
    if (ammount < 0) {
      ammount = 0;
    }

    res.json({
      ammount,
      products: product,
    });
  } catch (error) {
    next({
      status: 404,
      message: `ERROR_IN_PRODUCT: ${error}`,
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
      primaryImage,
      imageList,
    } = req.body;

    const user = await User.findOne({ _id: userId }).exec();

    if (!user) {
      throw new Error("USER_FIND_ERROR");
    }

    const product = await Product.create({
      userId,
      username: user.username,
      title,
      description,
      price,
      ammount,
      rating,
      category,
      primaryImage,
      imageList,
    });
    if (!product) {
      throw new Error("PRODUCT_CREATION_ERROR");
    }

    res.json({
      user: user.username,
      title,
      description,
      price,
      ammount,
      rating,
      category,
      primaryImage: product.primaryImage,
      imageList: product.imageList,
    });
  } catch (error) {
    next({
      status: 404,
      message: `ERROR_IN_CREATION: ${error}`,
    });
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { userId, postId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("USER_FIND_ERROR");
    }

    const updateFavoriteList = await User.updateOne(
      { _id: user._id },
      { $addToSet: { favoritePosts: { productId: postId } } }
    );

    if (!updateFavoriteList) {
      throw new Error("ERROR_IN_FAVORITES");
    }

    return res.json({
      user: user.username,
      favorite: user.favoritePosts,
    });
  } catch (error) {
    next({
      status: 404,
      message: `ERROR_IN_FAVORITES: ${error}`,
    });
  }
};

const getFavorite = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({ _id: userId }).populate(
      "favoritePosts.productId"
    );

    if (!user) {
      throw new Error("USER_VALIDATE_ERROR");
    }

    res.json({ favorite: user.favoritePosts });
  } catch (error) {
    next({
      status: 404,
      message: `ERROR_IN_FAVORITES: ${error}`,
    });
  }
};

export { getProducts, createProduct, addFavorite, getFavorite };
