import { Router } from "express";
import { z } from "zod";

import { Tag } from "../schemas/tag.model";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const requiredBody = z.object({
      title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long." })
        .max(20, { message: "Title can't exceed 20 characters." }),
    });
    const { success, error } = requiredBody.safeParse(req.body);
    if (!success) {
      res.status(400).json({ message: "Invalid input format.", error: error });
      return;
    }
    await Tag.create({
      title: title,
    });
    res.status(200).json({ message: "Tag created successfully." });
  } catch (e) {
    res.status(400).json({ message: "Tag creation failed." });
  }
});

export default router;
