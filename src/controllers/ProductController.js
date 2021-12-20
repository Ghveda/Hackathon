import Product from "../models/productModel.js";
import Image from "../models/imageModel.js";
import User from "../models/userModel.js";
import Favorite from "../models/favoriteModel.js";

const getProducts = async (_, res, next) => {
  try {
    const product = await Product.find({}).exec();
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

    const user = await User.find({ _id: userId }).exec();

    if (!user) {
      throw new Error("User error");
    }

    console.log(user);
    res.json({
      user: user[0].username,
      title,
      description,
      price,
      ammount,
      rating,
      category,
      image: image.images,
    });
  } catch (error) {
    next({
      status: 404,
      message: `Error in creation: ${error}`,
    });
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { userId, postId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User error");
    }

    const favorites = await Favorite.findOne({ _id: user.favoritePosts });
    console.log(favorites);
    if (!favorites) {
      console.log("!favorite");
      const fav = await Favorite.create({
        favPosts: [postId],
      });

      await User.updateOne({ _id: user._id }, { favoritePosts: fav._id }, done);
      return res.json({
        favorites,
      });
    }

    const done = favorites.favPosts.push(postId);
    await favorites.save();

    return res.json({
      favorites,
    });
  } catch (error) {
    next({
      status: 404,
      message: `Error in favorites ${error}`,
    });
  }
};

// const getFavorite = (req, res, next) => {
//   const {} = req.body;

// };

export { getProducts, createProduct, addFavorite };
