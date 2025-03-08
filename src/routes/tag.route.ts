import { Router } from "express";
import { z } from "zod";

import { Tag } from "../schemas/tag.model";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const requiredBody = z.object({
      title: z.string().min(3).max(20),
    });
    const { success, error } = requiredBody.safeParse(req.body);
    if (!success) {
      res.status(400).json({ message: "Invalid input format", error: error });
      return;
    }
    await Tag.create({
      title: title,
    });
    res.status(200).json({ message: "Tag added successfully" });
  } catch (e) {
    res.status(400).json({ message: "Tag creation failed" });
  }
});

export default router;
