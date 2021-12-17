import express from "express";
import { registerUser, authUser } from "../controllers/UserController.js";

const route = express.Router();

route.post("/auth", authUser);
route.post("/register", registerUser);
export default route;
