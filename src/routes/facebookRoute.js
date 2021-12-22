import express from "express";
import passport from "passport";

const route = express.Router();

route.get("/", (_, res) => {
  res.send("done");
});

route.get("/failed", (_, res) => {
  res.send("failed");
});
route.get(
  "/facebook",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/failed",
  })
);

route.get(
  "/auth",
  passport.authenticate("facebook", { failureRedirect: "/login" })
);

export default route;
