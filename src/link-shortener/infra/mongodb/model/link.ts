import { Schema, model } from "mongoose";

const linkSchema = new Schema({
  original: { type: String, required: true },
  short: { type: String, required: true },
});

export const LinkModel = model("Link", linkSchema);
