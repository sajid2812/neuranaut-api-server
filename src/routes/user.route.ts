import { Router, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";

import { User } from "../schemas/user.model";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const requiredBody = z.object({
      username: z.string().min(3).max(30),
      password: z.string().min(3).max(20),
    });
    const { success, error } = requiredBody.safeParse(req.body);
    if (!success) {
      res.status(400).json({ message: "Incorrect input format", error: error });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    await User.create({
      username: username,
      password: hashedPassword,
    });
    res.status(200).json({ message: "Signup successfull" });
  } catch (e) {
    res.status(400).json({ message: "User already exists" });
  }
});

export default router;
