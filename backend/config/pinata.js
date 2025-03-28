
const PinataSDK = require('@pinata/sdk'); // Correct import
require('dotenv').config(); // Ensure environment variables are loaded

console.log("🔍 PINATA_API_KEY:", process.env.PINATA_API_KEY);
console.log("🔍 PINATA_SECRET_API_KEY:", process.env.PINATA_SECRET_API_KEY);

// Initialize Pinata SDK with API keys from environment variables
const pinata = new PinataSDK("8bafc884efb921b5b1e", "382572b514947e864ba6396e9186166ce42548c92c4b680fcde0d5ff1e95a4e8");

module.exports = pinata;
