import passport from "passport";
import { Strategy } from "passport-facebook";
import dotenv from "dotenv";
import User from "../../models/userModel.js";

dotenv.config();
// facebook

const facebookStrategy = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ["id", "displayName", "email"],
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          console.log("profile date: ", profile);
          const user = await User.findOne({ facebookId: profile.id });
          if (user) {
            return done(null, user);
          }

          const newUser = await User.create({
            username: profile.displayName,
            facebookId: profile.id,
            facebookAccessToken: accessToken,
          });

          return done(null, newUser);
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
