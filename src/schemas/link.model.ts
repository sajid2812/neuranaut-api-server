import { Schema, model, Types } from "mongoose";

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Link = model("Link", linkSchema);
