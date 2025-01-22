import express from "express";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SigninSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { tokenValidatorMiddlware } from "./middleware";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(403).json({ message: "invalid creds" });
    return;
  }

  try {
    // hash the pass :: TODO
    const user = await prismaClient.user.create({
      data: {
        email: parsedData?.data?.username,
        password: parsedData?.data?.password,
        name: parsedData?.data?.name,
      },
    });

    if (user) {
      res.status(201).json({ user });
      return;
    }
  } catch (e) {
    res.status(411).json({
      message: "User already exists",
    });
  }

  res.status(500).json({ message: "internal server error" });
  return;
});

app.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(403).json({ message: "invalid creds" });
    return;
  }

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData?.data?.username,
        password: parsedData?.data?.password,
      },
    });

    if (!user) {
      res.json(403).json({ message: "Incorrect email or password" });
      return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).json({ token });
    return;
  } catch (e) {
    res.json(403).json({ message: e });
    return;
  }
});

app.post("/room", tokenValidatorMiddlware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({ message: "Incorrect inputs" });
    return;
  }

  //@ts-ignore
  const userId = req.userId;

  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData?.data?.name,
        adminId: userId,
      },
    });

    res.status(201).json({ room });
  } catch (e) {
    res.send({ message: "room already exists" });
  }
});

app.listen(8000, () => console.log("http server running at port 8000"));
