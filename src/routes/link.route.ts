import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { auth } from "../middlewares/user.middleware";
import { Link } from "../schemas/link.model";
import { Content } from "../schemas/content.model";

const router = Router();

router.post("/share", auth, async (req: Request, res: Response) => {
  try {
    const existingLink = await Link.findOne(
      {
        //@ts-ignore
        user: req.user._id,
      },
      {
        hash: 1,
      }
    );
    if (existingLink) {
      res.status(200).json({ hash: existingLink.hash });
      return;
    }
    const link = await Link.create({
      hash: uuidv4(),
      //@ts-ignore
      user: req.user._id,
    });
    res.status(200).json({ hash: link.hash });
  } catch (e) {
    res.status(400).json({ message: "Link sharing failed." });
  }
});

router.get("/:hash", auth, async (req: Request, res: Response) => {
  try {
    const hash = req.params.hash;
    const link = await Link.findOne(
      {
        hash,
      },
      {
        user: 1,
      }
    );
    if (!link) {
      res.status(400).json({
        message: "Invalid share link.",
      });
      return;
    }
    const content = await Content.findOne({
      user: link.user,
    }).populate("user", "username");
    if (!content) {
      res.status(400).json({
        message: "Content not found.",
      });
      return;
    }
    res.status(200).json(content);
  } catch (e) {
    res.status(400).json({
      message: "Failed to fetch content.",
    });
  }
});

export default router;
