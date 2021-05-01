import passportGoogle from "passport-google-oauth2";
import passport from "passport";
import { User, UserDocument } from "../models/user";
import { NativeError } from "mongoose";
import { Request, Response, NextFunction } from "express";

const GoogleStrategy = passportGoogle.Strategy;

export const configPassport = () => {
    passport.serializeUser<any, any>((req, user, done) => {
        done(undefined, user);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err: NativeError, user: UserDocument) => done(err, user));
    });

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                callbackURL: `${process.env.API_URL as string}/auth/google/callback`,
            },
            async (accessToken: any, refreshToken: any, profile: any, done: any) => {
                let user = await User.findOne({ google: profile.id });

                if (!user) {
                    user = await new User({
                        email: profile.email,
                        google: profile.id,
                    }).save();
                }

                done(null, user);
            }
        )
    );
};

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(`${process.env.FRONTEND_URL as string}/login`);
};
