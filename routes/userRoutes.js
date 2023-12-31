import { Router } from "express";

import {
  signUp,
  signIn,
  getUserData,
  updateUserProfile,
} from "../controllers/userController.js";

import authenticate from "../middleware/Authentication.js";

const router = Router();

// POST request to handle user sign-in
router.post("/signup", signUp);
router.post("/signin", signIn);

// Define a route to get user data
router.get("/profile", authenticate, getUserData);

router.put("/updateProfile", authenticate, updateUserProfile);

export default router;
