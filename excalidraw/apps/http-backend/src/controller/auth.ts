import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";

export async function signupController(req: Request, res: Response) {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res.status(401).json({ message: "Invalid inputs" });
    return;
  }

  //dbcall
}

export async function signinController(req: Request, res: Response) {
  const userId = "1";
  const token = jwt.sign(userId, JWT_SECRET);
}
