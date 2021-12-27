import express from "express";
import passport from "passport";
// import { facebookAuth } from "../controllers/UserController.js";
import axios from "axios";

const route = express.Router();

// main endpoint
route.get("/auth", passport.authenticate("facebook"));

// redirect rout
// route.get("/", facebookAuth);

// callback
route.get(
  "/callback",
  passport.authenticate("facebook", { failureRedirect: "/failed" }),
  async function (req, res, next) {
    // http://localhost:5000/people/auth/facebook/auth
    try {
      const payload = req.user;

      res.status(200).json({
        ...payload,
      });
    } catch (error) {
      next({
        status: 400,
        message: `ERROR_IN_FACEBOOK_LOGIN :${error}`,
      });
    }
  }
);

// failed
route.get("/failed", (_, res) => {
  res.send("failed");
});

export default route;
