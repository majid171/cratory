import express from "express";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import { SESSION_SECRET, MONGO_URL, API_PORT } from "./utils/secrets";

// Configs
import { connectMongoDB } from "./config/mongoose";
import * as passportConfig from "./config/passport";

// Controllers
import * as userController from "./controllers/user";
import * as serviceController from "./controllers/service";

const app = express();
const PORT = API_PORT || 8080;

connectMongoDB(MONGO_URL);
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
app.use(cookieParser(SESSION_SECRET));
app.use(
    expressSession({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: process.env.MONGO_URL as string,
        }),
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Primary auth routes
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

// Service routes
app.post("/service", passportConfig.isAuthenticated, serviceController.addService);
app.delete("/service", passportConfig.isAuthenticated, serviceController.deleteService);
app.put("/service", passportConfig.isAuthenticated, serviceController.updateService);

export default app;
