import 'dotenv/config';   // loads .env.local automatically
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// 1️⃣ Define Admin schema
const adminSchema = new mongoose.Schema({
  adminname: { type: String, required: true },
  passwordHash: { type: String, required: true },
});
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

async function createAdmin() {
  try {
    // 2️⃣ Connect to MongoDB directly
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "change",       // your database name
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");

    // 3️⃣ Create admin
    const adminname = "change9898";
    const password = "change0092";
    const passwordHash = await bcrypt.hash(password, 10);

    const existing = await Admin.findOne({ adminname });
    if (!existing) {
      await Admin.create({ adminname, passwordHash });
      console.log("✅ Admin created successfully!");
    } else {
      console.log("⚠️ Admin already exists.");
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

createAdmin();

