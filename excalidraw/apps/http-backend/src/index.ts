import express from "express";
import tokenMiddleware from "./middleware";

// Routes import
import authRoutes from "./router/auth";

//app init
const app = express();

//routes
app.use("/auth", authRoutes);

app.post("/create-root", tokenMiddleware, (req, res) => {
  res.json({ roomId: 1234 });
  return;
});

//server start
app.listen(3001);
