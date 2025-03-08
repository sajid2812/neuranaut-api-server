import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { auth } from "../middlewares/user.middleware";
import { Link } from "../schemas/link.model";

const router = Router();

router.post("/", auth, async (req: Request, res: Response) => {
  try {
    await Link.create({
      hash: uuidv4(),
      //@ts-ignore
      user: req.user._id,
    });
    res.status(200).json({ message: "Link created successfully" });
  } catch (e) {
    res.status(400).json({ message: "Link creation failed" });
  }
});

export default router;
