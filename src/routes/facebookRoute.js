import express from "express";
import passport from "passport";

const route = express.Router();

// main endpoint
route.get("/auth", passport.authenticate("facebook"));

// callback
route.get(
  "/",
  passport.authenticate("facebook", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect("/");
  }
);

// failed
route.get("/failed", (_, res) => {
  res.send("failed");
});

export default route;
