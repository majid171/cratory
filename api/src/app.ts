import express from "express";
import dotenv from "dotenv";
import passport from "passport";

// Configs
import { connectMongoDB } from "./config/mongoose";
import * as passportConfig from "./config/passport";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 8080;
const mongoUrl = process.env.MONGO_URL as string;

connectMongoDB(mongoUrl);
passportConfig.configPassport();

app.set("port", PORT);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.get('/google', passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google'));

app.get("/", (req, res) => {
    res.send("OK");
})

export default app;