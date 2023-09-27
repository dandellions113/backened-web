import User from "../models/userModels.js";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

export async function signUp(req, res) {
  try {
    const { fullName, email, contactNumber, department, region, password } =
      req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      contactNumber,
      department,
      region,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h", // Token expiration time
    });

    res.status(200).json({ token, userId: user._id, fullName: user.fullName });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
