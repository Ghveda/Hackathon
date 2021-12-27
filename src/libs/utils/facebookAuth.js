import passport from "passport";
import { Strategy } from "passport-facebook";
import dotenv from "dotenv";
import User from "../../models/userModel.js";
import generateToken from "./generateToken.js";

dotenv.config();
// facebook

const facebookStrategy = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL:
          process.env.FACEBOOK_CALLBACK ||
          "http://localhost:5000/people/auth/facebook/callback",
        profileFields: ["id", "displayName", "email"],
        proxy: true,
      },
      async function (accessToken, refreshToken, profile, done) {
        let payload;
        try {
          const user = await User.findOne({ facebookId: profile.id });
          if (user) {
            payload = {
              _id: user._id,
              username: user.username,
              email: user.email,
              isAdmin: user.isAdmin,
              facebookAccessToken: user.facebookAccessToken,
              facebookRefreshToken: user.facebookRefreshToken,
              token: generateToken(user._id),
            };
            return done(null, payload);
          }

          const newUser = await User.create({
            username: profile.displayName,
            facebookId: profile.id,
            facebookAccessToken: accessToken,
            facebookRefreshToken: refreshToken,
          });

          payload = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            facebookAccessToken: newUser.facebookAccessToken,
            facebookRefreshToken: newUser.facebookRefreshToken,
            token: generateToken(newUser._id),
          };

          return done(null, payload);
        } catch (error) {
          done(error, false, error.message);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(err, user);
  });
};
export default facebookStrategy;
