import mongoose from "mongoose";

const CareerEmailSchema = new mongoose.Schema(
  {
    source: {
      type: String, // gmail, outlook, linkedin, internshala
      required: true,
    },

    userEmail: String,

    senderName: String,
    senderEmail: String,

    subject: String,
    body: String,

    company: String,
    role: String,

    status: {
      type: String,
      enum: ["APPLIED", "SHORTLISTED", "INTERVIEW", "REJECTED", "OFFER"],
      default: "APPLIED",
    },

    interview: Date,

    receivedAt: {
      type: Date,
      required: true,
    },

    rawPayload: Object,
  },
  { timestamps: true }
);

export default mongoose.models.CareerEmail ||
  mongoose.model("CareerEmail", CareerEmailSchema);
