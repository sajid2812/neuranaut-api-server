import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { JWT_SECRET } from "../config";

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.token) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    const token = req.headers.token as string;
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    //@ts-ignore
    req.user = decodedInfo;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
}
