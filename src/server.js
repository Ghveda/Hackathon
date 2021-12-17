import express from "express";
import env from "dotenv";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRouter.js";
import connnectDB from "./config/db.js";
import { notFount, errorHandler } from "./middleware/errorMiddleware.js";

env.config();
connnectDB();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use(notFount);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
