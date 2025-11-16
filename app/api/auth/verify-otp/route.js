import connectDB from "@/lib/mongodb";
import EmaiOtp from "@/models/EmaiOtp";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB(); // ✅ actually call it

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(
        JSON.stringify({ success: false, error: "Email and OTP are required" }),
        { status: 400 }
      );
    }

    const record = await EmaiOtp.findOne({ email });
    if (!record) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "OTP not found. Please request a new one.",
        }),
        { status: 400 }
      );
    }

    // ✅ Check expiration
    if (record.expiresAt < new Date()) {
      await EmaiOtp.deleteOne({ email });
      return new Response(
        JSON.stringify({ success: false, error: "OTP expired" }),
        { status: 400 }
      );
    }

    // ✅ Compare OTPs (await required)
    const match = await bcrypt.compare(otp, record.otpHash);
    if (!match) {
      record.attempts = (record.attempts || 0) + 1;
      await record.save();
      return new Response(
        JSON.stringify({ success: false, error: "OTP not matched. Try again." }),
        { status: 400 }
      );
    }

    // ✅ Delete OTP after success
    await EmaiOtp.deleteOne({ email });

    // ✅ Return success response
    return new Response(
      JSON.stringify({ success: true, message: "Verification complete" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("verify-otp error", err);
    return new Response(
      JSON.stringify({ success: false, error: err }),
      { status: 500 }
    );
  }
}
