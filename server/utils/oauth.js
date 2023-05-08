import passport from "passport";
import Google from "passport-google-oauth20"
import keys from "./keys";
const GoogleStrategy = Google.Strategy


passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
  },
  (accessToken, refreshToken, profile, done)=>{
      console.log("access token", accessToken)
      console.log("refresh Token", refreshToken)
      console.log("profile", profile);
      console.log("Done", done);
    }
  )
);


app.get("/auth/google", passport.authenticate("google"));