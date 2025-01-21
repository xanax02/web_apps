import express from "express";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SigninSchema,
} from "@repo/common/types";

const app = express();

app.post("/signup", (req, res) => {});

app.post("/signin", (req, res) => {});

app.get("/room", (req, res) => {});

app.listen(8000, () => console.log("http server running at port 8000"));
