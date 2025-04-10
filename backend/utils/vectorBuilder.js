const fs = require("fs");
const faiss = require("faiss-node");
const openai = require("openai");
const { MongoClient } = require("mongodb");

require("dotenv").config();
openai.apiKey = process.env.OPENAI_API_KEY;

const MONGO_URI = process.env.MONGO_URI;

(async () => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db("skill_trade");
  const users = await db.collection("users").find().toArray();

  const metadata = [];
  const vectors = [];

  for (let user of users) {
    const description = `${user.teachSkills?.join(", ")} | ${user.learnInterests?.join(", ")}`;
    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: description,
    });

    metadata.push({
      _id: user._id,
      username: user.username,
      email: user.email,
      walletAddress: user.walletAddress,
      teachSkills: user.teachSkills,
      learnInterests: user.learnInterests,
      profileCID: user.profileCID,
    });

    vectors.push(Float32Array.from(embeddingRes.data[0].embedding));
  }

  // Create FAISS index
  const dim = vectors[0].length;
  const index = new faiss.IndexFlatL2(dim);
  index.add(vectors);

  fs.writeFileSync("./data/vector_metadata.json", JSON.stringify(metadata, null, 2));
  fs.writeFileSync("./data/vector_index.faiss", faiss.writeIndex(index));

  console.log("✅ Vector index and metadata saved.");
  client.close();
})();
