import { Router, Request, Response } from "express";
import { z } from "zod";

import { auth } from "../middlewares/user.middleware";
import { contentTypes, Content } from "../schemas/content.model";

const router = Router();

router.post("/", auth, async (req: Request, res: Response) => {
  try {
    const { link, type, title, tags } = req.body;
    const requiredBody = z.object({
      link: z
        .string()
        .url({ message: "Please provide a valid URL." })
        .nonempty({ message: "URL can't be empty." }),
      type: z.enum(JSON.parse(JSON.stringify(contentTypes)), {
        message: `Type must be any of ${contentTypes.join(", ")}.`,
      }),
      title: z.string().min(3).max(100),
      tags: z.array(z.string()),
    });
    const { success, error } = requiredBody.safeParse(req.body);
    if (!success) {
      res.status(400).json({ message: "Invalid input format", error: error });
      return;
    }
    await Content.create({
      link: link,
      type: type,
      title: title,
      tags: tags,
      //@ts-ignore
      user: req.user._id,
    });
    res.status(200).json({ message: "Content created successfully" });
  } catch (e) {
    res.status(400).json({ message: "Content creation failed" });
  }
});

export default router;
