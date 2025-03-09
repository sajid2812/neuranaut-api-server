import { Router, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../schemas/user.model";
import { JWT_SECRET } from "../config";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const requiredBody = z.object({
      username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(30, { message: "Username can't exceed 30 characters." }),
      password: z
        .string()
        .min(3, { message: "Password must be at least 3 characters long." })
        .max(20, { message: "Password can't exceed 20 characters." }),
    });
    const { success, error } = requiredBody.safeParse(req.body);
    if (!success) {
      res
        .status(400)
        .json({ message: "Incorrect input format.", error: error });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    await User.create({
      username: username,
      password: hashedPassword,
    });
    res.status(200).json({ message: "Signup successfull." });
  } catch (e) {
    res.status(400).json({ message: "User already exists." });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const requiredBody = z.object({
      username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(30, { message: "Username can't exceed 30 characters." }),
      password: z
        .string()
        .min(3, { message: "Password must be at least 3 characters long." })
        .max(20, { message: "Password can't exceed 20 characters." }),
    });
    const { success, error } = requiredBody.safeParse(req.body);
    if (!success) {
      res.status(400).json({ message: "Invalid input format.", error: error });
      return;
    }
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_SECRET
    );
    res.status(200).json({ token });
  } catch (e) {
    res.status(401).json({ message: "Invalid credentials." });
  }
});

export default router;
