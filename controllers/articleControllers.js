// Controller to save a new article
import Article from "../models/articleModel.js";
import User from "../models/userModels.js";

export const saveArticle = async (req, res) => {
  try {
    const articleData = req.body;
    const article = new Article(articleData);
    await article.save();

    // Update the user's savednewsarticles array with the saved article's ObjectId
    const userId = req.userId; // Assuming req.userId is set by the authenticate middleware
    await User.findByIdAndUpdate(userId, {
      $addToSet: { savednewsarticles: article._id },
    });

    res.status(201).json(article);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate headline error (MongoDB error code 11000)
      res.status(400).json({ error: "Article is already saved." });
    } else {
      // Other error
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Controller to delete an article by ID
export const deleteArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);

    // Remove the article's ObjectId from the user's savednewsarticles array
    const userId = req.userId; // Assuming req.userId is set by the authenticate middleware
    await User.findByIdAndUpdate(userId, {
      $pull: { savednewsarticles: id },
    });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get all articles
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get articles of a specific user by their ID
export const getArticlesByUserId = async (req, res) => {
  try {
    const userId = req.userId; // Extract userId from req.userId

    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve articles saved by the user
    const userSavedArticleIds = user.savednewsarticles.map(String);
    const articles = await Article.find({ _id: { $in: userSavedArticleIds } });

    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
