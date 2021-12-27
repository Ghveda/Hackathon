import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const getProducts = async (req, res, next) => {
  try {
    const { skip = 0, limit = 5, category } = req.query;

    let where = {};
    let amount;

    if (category) {
      where.category = category;
    }

    const productLength = await Product.find(where).count();
    const product = await Product.find(where)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .exec();

    if (!product) {
      throw new Error("NOT_FOUND");
    }

    amount = productLength - (skip + limit);
    if (amount < 0) {
      amount = 0;
    }

    res.json({
      amount,
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

const deleteProduct = async (req, res, next) => {
  try {
    const { postId, userId } = req.query;
    const product = await Product.findOne({ postId });

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    if (product.userId != userId) {
      throw new Error("DELETE_NOT_ALLOWED");
    }

    res.json({
      message: "done",
    });
  } catch (error) {
    next({
      status: 404,
      message: `ERROR_IN_DELETE_PRODUCT: ${error}`,
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
    const { userId } = req.query;

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

export { getProducts, createProduct, addFavorite, getFavorite, deleteProduct };
