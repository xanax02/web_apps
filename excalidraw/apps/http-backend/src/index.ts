import express from "express";

const app = express();

app.post("/signup", (req, res) => {});

app.post("/signin", (req, res) => {});

app.get("/room", (req, res) => {});

app.listen(8000, () => console.log("http server running at port 8000"));
