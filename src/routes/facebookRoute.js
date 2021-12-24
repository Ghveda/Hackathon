import express from "express";
import passport from "passport";
import { facebookAuth } from "../controllers/UserController";

const route = express.Router();

// main endpoint
route.get("/auth", passport.authenticate("facebook"));

// redirect rout
route.get("/", facebookAuth);

// callback
route.get(
  "/callback",
  passport.authenticate("facebook", { failureRedirect: "/failed" }),
  function (_, res) {
    res.redirect("/people/auth/facebook");
  }
);

// failed
route.get("/failed", (_, res) => {
  res.send("failed");
});

export default route;
