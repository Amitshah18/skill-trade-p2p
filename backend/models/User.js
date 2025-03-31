const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    walletAddress: { type: String, required: true },
    teachSkills: { type: [String], required: true },
    learnInterests: { type: [String], required: true },
    profilePicHash: { type: String },  // ✅ Stores IPFS Hash of Profile Pic
    pinataMetadataHash: { type: String },  // ✅ Stores IPFS Hash of User Metadata JSON
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
