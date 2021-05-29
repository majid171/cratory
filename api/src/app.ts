import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import MongoStore from "connect-mongo";

// Configs
import { connectMongoDB } from "./config/mongoose";
import * as passportConfig from "./config/passport";

// Controllers
import * as userController from "./controllers/user";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 8080;

connectMongoDB(process.env.MONGO_URL as string);
passportConfig.configPassport();

app.set("port", PORT);

app.use(
    cors({
        origin: process.env.FRONTEND_URL as string,
        allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser(`${process.env.SESSION_SECRET as string}`));
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET as string,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: process.env.MONGO_URL as string,
        }),
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Primary routes
app.get("/auth/logout", passportConfig.isAuthenticated, userController.logout);
app.get("/auth/check", passportConfig.isAuthenticated, userController.checkIfAuth);
app.post("/auth/signin", userController.signin);
app.post("/auth/signup", userController.signup);


// Google OAuth login
app.get("/auth/google", passport.authenticate("google", { scope: ["openid", "profile", "email"] }));
app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.FRONTEND_URL as string}`,
        failureRedirect: `${process.env.FRONTEND_URL as string}/signin`,
    })
);

// Facebook OAuth login
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: `${process.env.FRONTEND_URL as string}`,
        failureRedirect: `${process.env.FRONTEND_URL as string}/signin`,
    })
);

export default app;
