import { Schema, model } from "mongoose";

const articleSchema = new Schema({
  Headline: {
    type: String,
    required: true,
    unique: true,
  },
  Description: {
    type: String,
  },
  Img: {
    type: String, // URL for the article's image
  },
  Link: {
    type: String, // URL for the full article
  },
  Timestamp: {
    type: String, // Timestamp for the article
  },
  cms: {
    type: Boolean, // Indicates if the article is from a content management system
  },
  content: {
    type: String, // Full content of the article
  },
  sentiment: {
    type: String, // Sentiment of the article (e.g., "positive," "negative," "neutral")
  },
  time: {
    type: Number, // Unix timestamp or any other relevant time format
  },
  // Add other fields as needed
});

export default model("Article", articleSchema);
