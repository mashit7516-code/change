// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  password: { type: String }, // only for email users
  image: { type: String },
  provider: { type: String, enum: ["email", "google"], default: "email" },
  isVerified: { type: Boolean, default: false },
  cart: [
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "AddProduct" },
    quantity: { type: Number, default: 1 },
  }
]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
