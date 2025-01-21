import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

interface customRequest extends Request {
  userId: string;
}

export function tokenValidatorMiddlware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"] ?? "";

  const decode = jwt.verify(token, JWT_SECRET);

  if (decode) {
    (req as customRequest).userId = (decode as JwtPayload).userId;
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
}
