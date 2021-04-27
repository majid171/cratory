import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { User, UserDocument } from "../models/user";
import { NativeError } from "mongoose";

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err: NativeError, user: UserDocument) => done(err, user));
});

// passport.use(
//     new GoogleStrategy({
//         clientID: '',
//         clientSecret: '',
//         callbackURL: '/auth/google/callback'
//     }, (req: any, accessToken, refreshToken, profile, done) => {
        
//     })
// );
