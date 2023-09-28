import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import cors from "cors";

const app = express();

//cors
app.use(cors());

const port = process.env.PORT || 3000;
app.use(express.json());

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//routes

app.use("/api/users", userRoutes);
// API routes
app.use("/api/articles", articleRoutes);

//cors configuration
const corsOptions = {
  origin: "http://localhost:5173", // Adjust to your frontend's URL in production
};

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mongoURI = "mongodb://localhost:27017/SIH";

// Connect to the MongoDB database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Listen for the database connection event
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Listen for the database error event
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
