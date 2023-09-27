import { Router } from "express";
const router = Router();
import { signUp, signIn } from "../controllers/userController.js";

// POST request to handle user sign-in
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
