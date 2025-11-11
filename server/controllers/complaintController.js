import Complaint from '../models/Complaint.js';
import cloudinary from '../config/cloudinary.js';
import axios from "axios";

export const createComplaint = async (req, res) => {
  try {
    const { city, state, address, image } = req.body;

    // Validate required fields
    if (!city || !state || !address) {
      return res.status(400).json({ message: 'City, state, and address are required.' });
    }

    // Upload image to Cloudinary (if provided)
    let imageUrl = null;
    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      } catch (err) {
        return res.status(500).json({ message: 'Image upload to Cloudinary failed.', error: err.message });
      }
    }

    // 🧠 AI Integration — Send address text to Flask API
    let aiCategory = "Uncategorized";
    let confidence = 0;

    try {
      const aiResponse = await axios.post("http://127.0.0.1:5001/predict", {
        text: address
      });

      aiCategory = aiResponse.data.category || "Uncategorized";
      confidence = aiResponse.data.confidence || 0;
    } catch (aiErr) {
      console.error("AI Service error:", aiErr.message);
    }

    // Create new complaint in MongoDB
    const newComplaint = await Complaint.create({
      user: req.user._id,
      city,
      state,
      address,
      imageUrl,
      category: aiCategory,
      confidence,
      status: "New",
      createdAt: new Date()
    });

    res.status(201).json({
      message: 'Complaint submitted successfully.',
      complaint: newComplaint
    });

  } catch (error) {
    console.error('Error while creating complaint:', error);
    res.status(500).json({ message: 'Server error while submitting complaint.' });
  }
};