import express, { json, Request, Response } from "express";

// Routes import
import authRoutes from "./router/auth";

//app init
const app = express();

//routes
app.use("/auth", authRoutes);

// app.post("/create-root", (req, res) => {
//     return res.json({roomId: 1234})
// })

//server start
app.listen(3001);
