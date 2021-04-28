import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import {connectMongoDB} from "./config/mongoose";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 8080;
const mongoUrl = process.env.MONGO_URL as string;

connectMongoDB(mongoUrl);

app.set("port", PORT);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("OK");
})

export default app;