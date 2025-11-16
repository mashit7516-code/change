import mongoose from "mongoose";

const EmailOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  otpHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, default: 0 }, 
  verified: { type: Boolean, default: false }, 
});

export default mongoose.models.EmailOtp || mongoose.model("EmailOtp", EmailOtpSchema);
