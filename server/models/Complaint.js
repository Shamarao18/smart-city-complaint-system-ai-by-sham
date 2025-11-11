import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  complaintCode: { 
    type: String, 
    unique: true, 
    required: true 
  }, // readable unique code like CMP1234

  name: { 
    type: String, 
    required: true 
  },

  city: { 
    type: String, 
    required: true 
  },

  state: { 
    type: String, 
    required: true 
  },

  address: { 
    type: String, 
    required: true 
  },

  image: { 
    type: String 
  },

  department: { 
    type: String, 
    default: "General Department" 
  }, // 🧠 AI detected category

  confidence: { 
    type: Number, 
    default: 0 
  }, // AI model confidence %

  status: { 
    type: String, 
    enum: ["Pending", "In Progress", "Resolved"], 
    default: "Pending" 
  },

  date: { 
    type: Date, 
    default: Date.now 
  },
});

export default mongoose.model("Complaint", complaintSchema);