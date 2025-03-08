import { Schema, model, Types } from "mongoose";

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new Schema(
  {
    link: { type: String, required: true },
    type: {
      type: String,
      enum: contentTypes,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tag",
      },
    ],
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Content = model("Content", contentSchema);
