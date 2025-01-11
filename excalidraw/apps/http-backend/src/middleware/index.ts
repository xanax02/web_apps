import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] ?? "";

  const decoded = jwt.verify(token, "SOME_SECRETE");
}
