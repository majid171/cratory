import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 8080;

app.get("/", (req, res) => {
    res.send("OK");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
