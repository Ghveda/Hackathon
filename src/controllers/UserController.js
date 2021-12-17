import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
  console.log("before try");
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
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
    throw new Error("Invalid user data");
  } catch (error) {
    return res.json({
      error,
    });
  }
};

const authUser = async (req, res) => {
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
  } catch (error) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

export { registerUser, authUser };
