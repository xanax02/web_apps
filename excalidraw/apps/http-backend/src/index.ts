import express from "express";
import tokenMiddleware from "./middleware";

// Routes import
import authRoutes from "./router/auth";
import { CreateRoomSchema } from "@repo/common/types";

//app init
const app = express();

//routes
app.use("/auth", authRoutes);

app.post("/create-root", tokenMiddleware, (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);

  if (!data.success) {
    res.status(401).json({ message: "Invalid input" });
    return;
  }

  res.json({ roomId: 1234 });
  return;
});

//server start
app.listen(3001);
