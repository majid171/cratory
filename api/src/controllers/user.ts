import { NextFunction, request, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import passport from "passport";
import { User, UserDocument } from "../models/user";

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password cannot be blank").isLength({ min: 1 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.redirect(`${process.env.FRONTEND_URL}/signin`);
    }

    passport.authenticate("local", (err: Error, user: UserDocument) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.sendStatus(400);
        }

        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json(user);
        });
    })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
    req.session.destroy(() => {
        req.logout();
        return res.json("logged out");
    });
};

export const checkIfAuth = (req: Request, res: Response) => {
    return res.json(true);
};
