import express, { Request, Response } from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

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

app.use((req: Request, res: Response, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL as string);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        origin: process.env.FRONTEND_URL as string,
    })
);

// Primary routes
app.get("/auth/logout", userController.logout);

// Google OAuth login
app.get("/auth/google", passport.authenticate("google", { scope: ["openid", "profile", "email"] }));
app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.FRONTEND_URL as string}`,
        failureRedirect: `${process.env.FRONTEND_URL as string}/login`,
    })
);

// Facebook OAuth login
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: `${process.env.FRONTEND_URL as string}`,
        failureRedirect: `${process.env.FRONTEND_URL as string}/login`,
    }));
    
export default app;
