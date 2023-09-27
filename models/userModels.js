import { Schema, model } from "mongoose";

// Define a schema for the user model
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique in the database
  },
  contactNumber: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can add more fields as needed
});

// Create a "User" model from the schema
const User = model("User", userSchema);

export default User;
