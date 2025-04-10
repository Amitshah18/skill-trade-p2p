const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { ExpressPeerServer } = require("peer");
const connectDB = require("./config/db");
require("dotenv").config();

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing! Check your .env file.");
  process.exit(1);
} else {
  console.log("🔍 MONGO_URI from .env:", process.env.MONGO_URI);
}

// Initialize Express
const app = express();
const server = http.createServer(app); // ✅ Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend origin
    methods: ["GET", "POST"],
  },
});

// ✅ Connect to MongoDB
connectDB()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ Middleware
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ Add PeerJS Server for WebRTC
const peerServer = ExpressPeerServer(server, { debug: true });
app.use("/peerjs", peerServer);

// ✅ Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("join-room", ({ roomId, userId }) => {
    console.log(`📞 ${userId} joined room: ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      console.log(`🔴 ${userId} disconnected`);
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
});

// ✅ Error Middleware
app.use((err, req, res, next) => {
  console.error("❌ Global Error Handler:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
