import passport from "passport";
import passportGoogle from "passport-google-oauth2";
import passportFacebook from "passport-facebook";
import passportLocal from "passport-local";

import { User, UserDocument } from "../models/user";
import { NativeError } from "mongoose";
import { Request, Response, NextFunction } from "express";

const GoogleStrategy = passportGoogle.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const LocalStrategy = passportLocal.Strategy;

export const configPassport = () => {
    passport.serializeUser<any, any>((req, user, done) => {
        done(undefined, user);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err: NativeError, user: UserDocument) => done(err, user));
    });

    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            User.findOne({ email: email.toLowerCase() }, (err: NativeError, user: UserDocument) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(undefined, false, { message: `Email ${email} not found.` });
                }
                user.comparePassword(user.password, password, (err: Error, isMatch: boolean) => {
                    if (err) { return done(err); }
                    if (isMatch) {
                        return done(undefined, user);
                    }
                    return done(undefined, false, { message: "Invalid email or password." });
                });
            });
        })
    );

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                callbackURL: `${process.env.API_URL as string}/auth/google/callback`,
                passReqToCallback: true,
            },
            async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
                if (req.user) {
                    User.findOne({ google: profile.id }, (err: NativeError, existingUser: UserDocument) => {
                        if (err) {
                            return done(err);
                        }
                        if (existingUser) {
                            done(err);
                        } else {
                            User.findById(req.user.id, (err: NativeError, user: UserDocument) => {
                                if (err) {
                                    return done(err);
                                }
                                user.google = profile.id;
                                user.profile.name =
                                    user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
                                user.profile.gender = user.profile.gender || profile._json.gender;
                                user.profile.picture = user.profile.picture || profile.picture;
                                user.save((err) => {
                                    done(err, user);
                                });
                            });
                        }
                    });
                } else {
                    User.findOne({ google: profile.id }, (err: NativeError, user: UserDocument) => {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, user);
                        }

                        User.findOne({ email: profile.email }, (err: NativeError, existingEmailUser: UserDocument) => {
                            if (existingEmailUser) {
                                done(err);
                            } else {
                                const user: any = new User();
                                user.email = profile.email;
                                user.google = profile.id;
                                user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
                                user.profile.gender = profile._json.gender;
                                user.profile.location = profile._json.location ? profile._json.location.name : "";
                                user.profile.picture = profile.picture;

                                user.save((err: Error) => {
                                    done(err, user);
                                });
                            }
                        });
                    });
                }
            }
        )
    );

    passport.use(
        new FacebookStrategy(
            {
                clientID: `${process.env.FACEBOOK_CLIENT_ID as string}`,
                clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET as string}`,
                callbackURL: `${process.env.API_URL}/auth/facebook/callback`,
                passReqToCallback: true,
                profileFields: ["id", "emails", "name"],
            },
            async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
                if (req.user) {
                    User.findOne({ facebook: profile.id }, (err: NativeError, existingUser: UserDocument) => {
                        if (err) {
                            return done(err);
                        }
                        if (existingUser) {
                            done(err);
                        } else {
                            User.findById(req.user.id, (err: NativeError, user: UserDocument) => {
                                if (err) {
                                    return done(err);
                                }
                                user.facebook = profile.id;
                                user.profile.name =
                                    user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
                                user.profile.gender = user.profile.gender || profile._json.gender;
                                user.profile.picture =
                                    user.profile.picture ||
                                    `https://graph.facebook.com/${profile.id}/picture?type=large`;
                                user.save((err) => {
                                    done(err, user);
                                });
                            });
                        }
                    });
                } else {
                    User.findOne({ facebook: profile.id }, (err: NativeError, user: UserDocument) => {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, user);
                        }

                        User.findOne(
                            { email: profile._json.email },
                            (err: NativeError, existingEmailUser: UserDocument) => {
                                if (existingEmailUser) {
                                    done(err);
                                } else {
                                    const user: any = new User();
                                    user.email = profile._json.email;
                                    user.facebook = profile.id;
                                    user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
                                    user.profile.gender = profile._json.gender;
                                    user.profile.location = profile._json.location ? profile._json.location.name : "";
                                    user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
                                    user.save((err: Error) => {
                                        done(err, user);
                                    });
                                }
                            }
                        );
                    });
                }
            }
        )
    );
};

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    } else
        return res.status(401).json({
            error: "User not authenticated",
        });
};
