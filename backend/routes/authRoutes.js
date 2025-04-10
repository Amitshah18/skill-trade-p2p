const express = require("express");
const multer = require("multer");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const FormData = require("form-data"); // ✅ Import FormData
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware"); // Import middleware
require("dotenv").config();

const router = express.Router();

// ✅ Store files in memory before uploading to Pinata
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ✅ Connect to MongoDB
const client = new MongoClient(process.env.MONGO_URI);
client.connect();
const db = client.db("skill_trade");
const users = db.collection("users");

// ✅ Pinata API Keys
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;
const PINATA_URL_FILE = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const PINATA_URL_JSON = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

// ✅ Signup Route - Upload Profile Pic & User Data to Pinata, Store CID in MongoDB
router.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log("🔥 Received Signup Request");
  console.log("➡️ Body:", req.body);
  console.log("📸 File:", req.file);

  try {
    const { username, email, password, walletAddress, teachSkills, learnInterests } = req.body;

    if (!username || !email || !password || !walletAddress) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    console.log("✅ Checking if user already exists in MongoDB...");
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      console.error("❌ User already exists:", email);
      return res.status(400).json({ error: "User already registered." });
    }

    // ✅ Parse teachSkills & learnInterests (if they are strings)
    const parsedTeachSkills = typeof teachSkills === "string" ? JSON.parse(teachSkills) : teachSkills;
    const parsedLearnInterests = typeof learnInterests === "string" ? JSON.parse(learnInterests) : learnInterests;

    // ✅ Hash the password before storing
    console.log("🔑 Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("✅ Password hashed successfully.");

    let profileCID = null;
    let userDataCID = null;

    // ✅ Upload Profile Picture to Pinata
    if (req.file) {
      try {
        console.log("🚀 Uploading Profile Picture to Pinata...");
        const formData = new FormData();
        formData.append("file", req.file.buffer, {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        });

        formData.append("pinataMetadata", JSON.stringify({ name: req.file.originalname }));
        formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

        const pinataRes = await axios.post(PINATA_URL_FILE, formData, {
          headers: {
            ...formData.getHeaders(),
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
          },
        });

        profileCID = pinataRes.data.IpfsHash;
        console.log("✅ Profile Picture Uploaded:", profileCID);
      } catch (error) {
        console.error("❌ Pinata Upload Error:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Error uploading profile picture" });
      }
    }

    // ✅ Upload User Data to Pinata as JSON
    try {
      console.log("🚀 Uploading User Data to Pinata...");
      const userMetadata = { username, email, walletAddress, teachSkills: parsedTeachSkills, learnInterests: parsedLearnInterests, profileCID };

      const pinataMetadataRes = await axios.post(PINATA_URL_JSON, userMetadata, {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      });

      userDataCID = pinataMetadataRes.data.IpfsHash;
      console.log("✅ User Data Uploaded to Pinata:", userDataCID);
    } catch (error) {
      console.error("❌ Pinata JSON Upload Error:", error.response ? error.response.data : error.message);
      return res.status(500).json({ error: "Error uploading user data to Pinata" });
    }

    console.log("💾 Storing user in MongoDB...");
    const newUser = { username, email, password: hashedPassword, walletAddress, userDataCID };

    try {
      const result = await users.insertOne(newUser);
      console.log("✅ User registered successfully:", result.insertedId);
      res.status(201).json({ message: "User registered successfully!", userId: result.insertedId, userDataCID, profileCID });
    } catch (dbError) {
      console.error("❌ MongoDB Insert Error:", dbError);
      return res.status(500).json({ error: "Database insertion failed" });
    }

  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ error: "Signup failed" });
  }
});

// ✅ Login Route - Authenticate User & Return JWT Token
router.post("/login", async (req, res) => {
  console.log("🔐 Login Attempt:", req.body.email);
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.error("❌ Missing credentials");
      return res.status(400).json({ error: "Email and password are required." });
    }

    console.log("🔍 Searching for user in MongoDB...");
    const user = await users.findOne({ email });

    if (!user) {
      console.error("❌ User not found:", email);
      return res.status(400).json({ error: "Invalid email or password." });
    }

    console.log("🔑 Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.error("❌ Password does not match for:", email);
      return res.status(400).json({ error: "Invalid email or password." });
    }

    console.log("✅ Password verified, generating JWT...");
    const token = jwt.sign(
      { userId: user._id, email: user.email, userDataCID: user.userDataCID },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Fetch metadata from Pinata using userDataCID
    let userData = null;
    try {
      const pinataURL = `https://gateway.pinata.cloud/ipfs/${user.userDataCID}`;
      const response = await axios.get(pinataURL);
      userData = response.data;
    } catch (pinataErr) {
      console.error("❌ Failed to fetch user data from Pinata:", pinataErr.message);
      return res.status(500).json({ error: "Failed to fetch user profile data" });
    }

    console.log("✅ Login Successful:", email);
    res.json({
      message: "Login successful!",
      token,
      userDataCID: user.userDataCID,
      userData,
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Server error." });
  }
});

// ✅ Protected Route - Fetch User Data from Pinata
router.get("/user-data", authMiddleware, async (req, res) => {
  console.log("🔍 Fetching user data for:", req.user.userDataCID);

  try {
    const { userDataCID } = req.user;

    if (!userDataCID) {
      console.error("❌ User data CID not found.");
      return res.status(400).json({ error: "User data not found." });
    }

    console.log("🌐 Fetching from Pinata:", userDataCID);
    const pinataURL = `https://gateway.pinata.cloud/ipfs/${userDataCID}`;
    const response = await axios.get(pinataURL);

    console.log("✅ User data retrieved successfully!");
    res.json({ message: "User data retrieved successfully!", userData: response.data });

  } catch (error) {
    console.error("❌ Fetch User Data Error:", error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
