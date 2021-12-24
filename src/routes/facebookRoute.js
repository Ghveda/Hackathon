import express from "express";
import passport from "passport";
import { facebookAuth } from "../controllers/UserController.js";

const route = express.Router();

// main endpoint
route.get("/auth", passport.authenticate("facebook"));

// redirect rout
route.get("/", facebookAuth);

// callback
route.get(
  "/callback",
  passport.authenticate("facebook", { failureRedirect: "/failed" }),
  function (req, res) {
    console.log("req.body: ", req.body);
    console.log("req.query: ", req.query);
    console.log("req.params: ", req.params);
    res.redirect("www.google.com");
  }
);

// failed
route.get("/failed", (_, res) => {
  res.send("failed");
});

export default route;
