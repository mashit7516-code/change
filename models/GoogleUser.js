import mongoose from "mongoose";

const GoogleUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.GoogleUser || mongoose.model("GoogleUser", GoogleUserSchema);
