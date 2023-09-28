import { Router } from "express";
const router = Router();

import authenticate from "../middleware/Authentication.js";

import {
  saveArticle,
  deleteArticleById,
  getAllArticles,
  getArticlesByUserId,
} from "../controllers/articleControllers.js";

// Route to save a new article
router.post("/", authenticate, saveArticle);

// Route to delete an article by ID
router.delete("/:id", authenticate, deleteArticleById);

// Fetch all articles
router.get("/", authenticate, getAllArticles);
router.get("/getuserarticles", authenticate, getArticlesByUserId);

export default router;
