import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function signupController() {}

export async function signinController(req: Request, res: Response) {
  const userId = "1";
  jwt.sign(userId, "SOME_SECRETE");
}
