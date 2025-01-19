import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

export async function signupController(req: Request, res: Response) {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res.status(401).json({ message: "Invalid inputs" });
    return;
  }

  //dbcall
  // const user = await prismaClient.user.create({
  //   data: {
  //     email: req.body.email,
  //     name: req.body.name,
  //     passwrod: req.body.passwrod
  //   }
  // })
  res.json({ userId: 123 });
}

export async function signinController(req: Request, res: Response) {
  const data = SigninSchema.safeParse(req.body);

  if (!data.success) {
    res.status(401).json({ message: "Invalid inputs" });
    return;
  }

  const userId = "1";
  const token = jwt.sign(userId, JWT_SECRET);

  res.json({ token });
}
