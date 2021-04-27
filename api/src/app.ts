import express from "express";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 8080;

app.set("port", PORT);

app.use(passport.initialize());
app.use(express.json());

app.get("/", (req, res)  => {
    res.send("OK");
})

export default app;