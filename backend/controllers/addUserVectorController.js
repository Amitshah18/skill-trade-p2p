const fs = require("fs");
const path = require("path");
const openai = require("openai");
const faiss = require("faiss-node");

openai.apiKey = process.env.OPENAI_API_KEY;

const metadataPath = path.join(__dirname, "../data/vector_metadata.json");
const indexPath = path.join(__dirname, "../data/vector_index.faiss");

exports.addUserVector = async (req, res) => {
  try {
    const { name, skills, description = "" } = req.body;

    if (!name || !skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ error: "Missing or invalid user info" });
    }

    const inputText = skills.join(", ") + " " + description;

    // 1. Generate embedding
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: inputText,
    });
    const vector = Float32Array.from(response.data[0].embedding);

    // 2. Load or create FAISS index
    let index;
    if (fs.existsSync(indexPath)) {
      const existingIndexData = fs.readFileSync(indexPath);
      index = faiss.readIndex(existingIndexData);
    } else {
      index = new faiss.IndexFlatL2(vector.length);
    }

    index.add(vector);
    fs.writeFileSync(indexPath, faiss.writeIndex(index));

    // 3. Update metadata
    let metadata = [];
    if (fs.existsSync(metadataPath)) {
      const raw = fs.readFileSync(metadataPath, "utf8").trim();
      metadata = raw ? JSON.parse(raw) : [];
    }

    metadata.push({ name, skills, description });
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    res.json({ success: true });
  } catch (err) {
    console.error("Error in addUserVector:", err.message);
    res.status(500).json({ error: "Failed to process user vector" });
  }
};
