import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { NativeError } from "mongoose";
import passport from "passport";
import { User, UserDocument } from "../models/user";

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password cannot be blank").isLength({ min: 1 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.sendStatus(401);
    }

    passport.authenticate("local", (err: Error, user: UserDocument) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.sendStatus(401);
        }

        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            res.cookie("user", user._id, { httpOnly: true });
            return res.json(user);
        });
    })(req, res, next);
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    await check("firstName", "First Name cannot be blank").isLength({ min: 1 }).run(req);
    await check("lastName", "Last Name cannot be blank").isLength({ min: 1 }).run(req);
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password cannot be blank").isLength({ min: 1 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.redirect(`${process.env.FRONTEND_URL}/signup`);
    }

    const name: String = `${req.body.firstName as String} ${req.body.lastName as String}`;

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        profile: {
            name: name,
        },
    });

    User.findOne({ email: req.body.email }, (err: NativeError, existingUser: UserDocument) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.redirect(`${process.env.FRONTEND_URL}/signup`);
        }
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                res.cookie("user", user._id, { httpOnly: true });
                return res.json(user);
            });
        });
    });
};

export const logout = (req: Request, res: Response) => {

    const user = req.user as UserDocument;
    res.clearCookie("user");
    res.cookie("locale", user._id, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 1 week

    req.session.destroy(() => {
        req.logout();
        return res.sendStatus(204);
    });
};

export const checkIfAuth = (req: Request, res: Response) => {
    return res.json(true);
};
