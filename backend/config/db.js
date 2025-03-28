const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        console.log("🔍 Mongo URI:", process.env.MONGO_URI); // Debugging

        if (!process.env.MONGO_URI) {
            throw new Error("❌ MONGO_URI is missing in .env file");
        }

        await mongoose.connect(process.env.MONGO_URI); // No deprecated options needed

        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
