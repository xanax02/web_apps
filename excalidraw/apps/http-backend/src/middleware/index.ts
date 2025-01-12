import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

interface CustomRequest extends Request {
  userId?: string;
}

function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] ?? "";

  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string") {
    return;
  }

  if (decoded) {
    (req as CustomRequest)["userId"] = decoded.userId;
    next();
  } else {
    res.json({ message: "Not Authorized" }).status(403);
  }
}

export default middleware;
