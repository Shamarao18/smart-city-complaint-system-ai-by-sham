import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import axios from "axios"; // ✅ for AI integration

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });
console.log("🔍 Loaded MONGO_URI:", process.env.MONGO_URI);

const app = express();

// ✅ CORS setup (allow frontend)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

// ✅ Multer for image upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Import model
import Complaint from "./models/Complaint.js";

/* ========================================
   🚀 SUBMIT COMPLAINT (with AI Integration)
======================================== */
app.post("/api/complaint", upload.single("image"), async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    if (!city || !state || !address) {
      return res.status(400).json({ message: "City, state, and address are required." });
    }

    // Generate unique complaint code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const complaintCode = `CMP${randomNum}`;

    // 🧠 Call Flask AI model first
let department = "General Department";
let confidence = 0;

try {
  const aiResponse = await axios.post("http://127.0.0.1:5001/predict", { text: address });
  if (aiResponse.data.success) {
    department = aiResponse.data.category || "General Department";
    confidence = aiResponse.data.confidence || 0;
  } else {
    console.error("⚠️ AI returned invalid response:", aiResponse.data);
  }
} catch (aiErr) {
  console.error("⚠️ AI Service not responding:", aiErr.message);
}

// 🧩 Keyword Override — only if AI is unsure (confidence < 70)
if (confidence < 70) {
  const lowerText = address.toLowerCase();

  if (lowerText.includes("electric") || lowerText.includes("power") || lowerText.includes("light")) {
    department = "Electricity Department";
  } else if (lowerText.includes("road") || lowerText.includes("pothole") || lowerText.includes("traffic")) {
    department = "Public Works Department";
  } else if (lowerText.includes("water") || lowerText.includes("pipe")) {
    department = "Water Department";
  } else if (lowerText.includes("garbage") || lowerText.includes("waste") || lowerText.includes("drain") || lowerText.includes("sewage")) {
    department = "Sanitation Department";
  } else if (lowerText.includes("tree") || lowerText.includes("park") || lowerText.includes("garden")) {
    department = "Gardening Department";
  }
}

console.log(`🤖 AI Predicted: ${department} (${confidence}%)`);

    // 🖼️ Save complaint
    const complaint = new Complaint({
      name,
      city,
      state,
      address,
      department,
      confidence,
      image: req.file ? req.file.filename : null,
      status: "Pending",
      date: new Date(),
      complaintCode,
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully!",
      complaintCode,
      department,
      confidence,
    });
  } catch (err) {
    console.error("❌ Error while saving complaint:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ========================================
   🔍 TRACK COMPLAINT BY CODE
======================================== */
app.get("/api/complaint/:code", async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ complaintCode: req.params.code });
    if (!complaint) return res.status(404).json({ error: "Complaint not found" });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ========================================
   🧾 GET ALL COMPLAINTS (Admin)
======================================== */
app.get("/api/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ========================================
   ✏️ UPDATE COMPLAINT STATUS
======================================== */
app.put("/api/complaints/:id", async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));