import User from "../models/userModel.js";
import generateToken from "../libs//utils/generateToken.js";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      next({
        status: 404,
        message: "User or Password is exists",
      });
    }
    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
    next({
      status: 404,
      message: "Invalid user data",
    });
  } catch (error) {
    next({
      status: 404,
      message: "Invalid user data",
    });
  }
};

const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
    next({
      status: 404,
      message: "Email or password is incorect",
    });
  } catch (error) {
    next({
      status: 401,
      message: "Invalid email or password",
    });
  }
};

const facebookAuth = (req, res, next) => {
  console.log("req.body: ", req.body);
  console.log("req.query: ", req.query);
  console.log("req.params: ", req.params);
  next();
};

export { registerUser, authUser, facebookAuth };
