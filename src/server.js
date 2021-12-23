import express from "express";
import env from "dotenv";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRouter.js";
import facebookRoute from "./routes/facebookRoute.js";
import connnectDB from "./config/db.js";
import { notFount, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
import passport from "passport";
import strategy from "passport-facebook";
import newStrategy from "./libs/utils/facebookAuth.js";

env.config();
connnectDB();
const app = express();
app.use(express.json());

app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT || 5000;

// facebook
passport.use(newStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  return done(null, id);
});

// routes
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/", facebookRoute);

// error middleware
app.use(notFount);
app.use(errorHandler);
console.log(process.env.FACEBOOK_CALLBACK);
// PORT
app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
