import Product from "../models/productModel.js";
import User from "../models/userModel.js";

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
      primaryImage,
      imageList,
    } = req.body;

    // const image = await Image.create({
    //   images,
    // });

    // if (!image) {
    //   throw new Error("Image error");
    // }

    const product = await Product.create({
      userId,
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
      throw new Error("Product error");
    }

    const user = await User.findOne({ _id: userId }).exec();

    if (!user) {
      throw new Error("User error");
    }

    console.log(user);
    res.json({
      user_id: user._id,
      user: user.username,
      title,
      description,
      price,
      ammount,
      rating,
      category,
      primaryImage,
      imageList,
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

    const updateFavoriteList = await User.updateOne(
      { _id: user._id },
      { $addToSet: { favoritePosts: postId } }
    );

    if (!updateFavoriteList) {
      throw new Error("Error in Favorite");
    }

    return res.json({
      user: user.username,
      favorite: user.favoritePosts,
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
