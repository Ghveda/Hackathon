import passport from "passport";
import strategy from "passport-facebook";
import dotenv from "dotenv";
import User from "../../models/userModel.js";

dotenv.config();
// facebook

const newStrategy = new strategy.Strategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL:
      process.env.FACEBOOK_CALLBACK || "http://localhost:5000/facebook",
    profileFields: ["id", "displayName", "email"],
  },
  function (accessToken, refreshToken, profile, cb) {
    console.log("profile date: ", accessToken);
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
    cb(null, profile);
  }
);

export default newStrategy;
