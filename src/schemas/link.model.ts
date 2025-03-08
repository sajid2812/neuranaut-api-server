import { Schema, model, Types } from "mongoose";

const linkSchema = new Schema(
  {
    hash: { type: String, required: true },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Link = model("Link", linkSchema);
