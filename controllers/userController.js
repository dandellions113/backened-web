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

async function getUserData(req, res) {
  try {
    // Assume you have user authentication in place
    // Retrieve user data based on the authenticated user's ID or any other criteria
    const userId = req.userId; // Get the user ID from authentication (you may use your own logic)

    // Query the user data by ID
    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data as a response
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export { getUserData };

// Controller to update user profile data
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // Assuming req.userId is set by the authenticate middleware
    const updates = req.body; // Data to update

    // Ensure that the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        user[key] = updates[key];
      }
    }

    // Save the updated user data
    await user.save();

    res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
