require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const axios = require("axios");
const FormData = require("form-data");

// 🔑 Pinata API Credentials
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;
const PINATA_URL_FILE = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const PINATA_URL_JSON = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

// ✅ Signup function
exports.signup = async (req, res) => {
  try {
    const { firstName, email, password, walletAddress, teachSkills, learnInterests } = req.body;
    const profilePic = req.file; // Profile picture uploaded

    if (!firstName || !email || !password || !walletAddress) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let profilePicHash = "";
    if (profilePic) {
      try {
        const formData = new FormData();
        formData.append("file", profilePic.buffer, { filename: profilePic.originalname }); // ✅ Correct way to append buffer
        console.log("Uploading to Pinata:", profilePic.originalname); //Debug log
        const pinataRes = await axios.post(PINATA_URL_FILE, formData, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
          },
        });

        profilePicHash = pinataRes.data.IpfsHash;
      } catch (error) {
        console.error("Pinata upload error:", error.response ? error.response.data : error.message);
        return res.status(500).json({ message: "Error uploading profile picture" });
      }
    }

    // ✅ Convert `teachSkills` & `learnInterests` safely
    const parsedTeachSkills = typeof teachSkills === "string" ? JSON.parse(teachSkills) : teachSkills;
    const parsedLearnInterests = typeof learnInterests === "string" ? JSON.parse(learnInterests) : learnInterests;

    // ✅ Upload user metadata JSON to Pinata
    let pinataMetadataHash = "";
    try {
      const userMetadata = {
        firstName,
        email,
        walletAddress,
        teachSkills: parsedTeachSkills,
        learnInterests: parsedLearnInterests,
        profilePicHash,
      };

      const pinataMetadataRes = await axios.post(PINATA_URL_JSON, JSON.stringify(userMetadata), {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      });

      pinataMetadataHash = pinataMetadataRes.data.IpfsHash;
    } catch (error) {
      console.error("Pinata JSON upload error:", error.response ? error.response.data : error.message);
      return res.status(500).json({ message: "Error uploading user data to Pinata" });
    }

    // ✅ Save user in MongoDB
    const newUser = new User({
      firstName,
      email,
      password: hashedPassword,
      walletAddress,
      teachSkills: parsedTeachSkills,
      learnInterests: parsedLearnInterests,
      profilePicHash,
      pinataMetadataHash,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", userId: newUser._id });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ token, user });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
