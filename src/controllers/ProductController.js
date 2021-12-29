import Product from "../models/productModel.js";
import Image from "../models/imageModel.js";
import User from "../models/userModel.js";
import { decodeToken } from "../libs/utils/generateToken.js";

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
      .populate("imageId")
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .exec();

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
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

const getProduct = async (req, res, next) => {
  try {
    const { productId } = req.query;
    const product = await Product.findOne({ _id: productId }).populate(
      "imageId"
    );

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    res.json(product);
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
      title,
      description,
      price,
      ammount,
      rating,
      category,
      primaryImage,
      imageList,
    } = req.body;

    const { token } = req.headers;
    const userData = decodeToken(token);

    const user = await User.findOne({ _id: userData.id }).exec();
    const image = await Image.create({
      primaryImage: primaryImage,
      imageList: imageList,
    });

    if (!user) {
      throw new Error("USER_FIND_ERROR");
    }

    const product = await Product.create({
      userId: user._id,
      username: user.username,
      title,
      description,
      price,
      ammount,
      rating,
      category,
      primaryImage,
      imageList,
      imageId: image._id,
    });
    if (!product) {
      throw new Error("PRODUCT_CREATION_ERROR");
    }

    const getImages = await product.populate("imageId");

    res.json({
      product: getImages,
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
    const { postId } = req.query;
    const { token } = req.headers;
    const user = decodeToken(token);

    const product = await Product.findOne({ postId });

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    if (product.userId != user.id) {
      throw new Error("DELETE_NOT_ALLOWED");
    }
    const image = await Image.findByIdAndDelete({ _id: product.imageId });

    if (!image) {
      throw new Error("IMAGES_NOT_DELETED");
    }

    await product.remove();
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

const deleteFavorite = async (req, res, next) => {
  try {
    const { postId } = req.query;
    const { token } = req.headers;
    const userToken = decodeToken(token);

    const user = await User.findOne({ _id: userToken.id });
    if (!user) {
      throw new Error("USER_FIND_ERROR");
    }
    user.favoritePosts.pop(postId);
    await user.save();
    res.json("done");
  } catch (error) {
    next({
      status: 404,
      message: `ERROR_IN_DELETE_FAVORITE: ${error}`,
    });
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const { token } = req.headers;
    const userToken = decodeToken(token);

    const product = await Product.findOne({ _id: postId });
    const user = await User.findOne({ _id: userToken.id });
    if (!user) {
      throw new Error("USER_FIND_ERROR");
    }
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    if (user.favoritePosts.includes(product._id)) {
      return res.json({
        ...user,
        user: user.username,
        favorite: user.favoritePosts,
      });
    }

    user.favoritePosts.push(product);
    await user.save();

    await user.populate("favoritePosts");

    return res.json({
      ...user,
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
    const { token } = req.headers;
    const userToken = decodeToken(token);

    const user = await User.findOne({ _id: userToken.id }).populate(
      "favoritePosts"
    );

    if (!user) {
      throw new Error("USER_VALIDATE_ERROR");
    }
    const images = await user.populate({
      path: "favoritePosts.imageId",
    });

    res.json({ favorite: images });
  } catch (error) {
    next({
      status: 404,
      message: `ERROR_IN_FAVORITES: ${error}`,
    });
  }
};

export {
  getProducts,
  getProduct,
  createProduct,
  addFavorite,
  getFavorite,
  deleteProduct,
  deleteFavorite,
};
