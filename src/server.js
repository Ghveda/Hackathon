import express from "express";
import env from "dotenv";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRouter.js";
import connnectDB from "./config/db.js";
import { notFount, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";

env.config();
connnectDB();
const app = express();
app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use(notFount);
app.use(errorHandler);

app.post("/", () => {});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
