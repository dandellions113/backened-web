import { Schema, model } from "mongoose";

const articleSchema = new Schema({
  description: String,
  lang: String,
  "published date": Date,
  publisher: {
    title: String,
    href: String,
  },
  sentiment: String,
  time: String,
  title: {
    type: String,
    required: true,
    unique: true,
  },
  url: String,
});

export default model("Article", articleSchema);
