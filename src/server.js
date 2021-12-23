import express from "express";
import env from "dotenv";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRouter.js";
import facebookRoute from "./routes/facebookRoute.js";
import connnectDB from "./config/db.js";
import { notFount, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
import passport from "passport";
import facebookStrategy from "./libs/utils/facebookAuth.js";

env.config();
connnectDB();
const app = express();
app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use(passport.initialize());
facebookStrategy();

const PORT = process.env.PORT || 5000;

// routes
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/people/auth/facebook", facebookRoute);

// error middleware
app.use(notFount);
app.use(errorHandler);
console.log(process.env.FACEBOOK_CALLBACK);
// PORT
app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
