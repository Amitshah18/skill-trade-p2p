const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // Load environment variables

// ✅ Debugging: Check if MONGO_URI is loading correctly
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing! Check your .env file.");
  process.exit(1); // Stop the server if no MongoDB connection string
} else {
  console.log("🔍 MONGO_URI from .env:", process.env.MONGO_URI);
}

// Initialize Express
const app = express();

// ✅ Connect to MongoDB
connectDB()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop server if DB fails to connect
  });

// ✅ CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies or credentials
};
app.use(cors(corsOptions));

// ✅ Middleware to parse JSON & URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Global Error Handler:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
