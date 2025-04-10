const fs = require("fs");
const path = require("path");
const openai = require("openai");
const faiss = require("faiss-node");
const { promisify } = require("util");

require("dotenv").config();
openai.apiKey = process.env.OPENAI_API_KEY;

const metadata = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/vector_metadata.json"), "utf8"));
const indexData = fs.readFileSync(path.join(__dirname, "../data/vector_index.faiss"));
const index = faiss.readIndex(indexData);

const getEmbedding = async (text) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return Float32Array.from(response.data[0].embedding);
};

exports.searchSkills = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Missing query" });

    const queryVector = await getEmbedding(query);
    const topK = 5;

    const result = index.search(queryVector, topK);
    const matched = result.indices[0].map((i) => metadata[i]);

    res.json({ results: matched });
  } catch (error) {
    console.error("AI Search Error:", error.message);
    res.status(500).json({ error: "Search failed" });
  }
};
