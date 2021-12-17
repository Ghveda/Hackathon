import express from "express";
import env from "dotenv";
import userRoute from "./routes/userRoute.js";
import connnectDB from "./config/db.js";

env.config();
connnectDB();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
