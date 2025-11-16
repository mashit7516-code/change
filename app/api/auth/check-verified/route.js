import connectDB from "@/lib/mongodb";
import EmaiOtp from "@/models/EmaiOtp";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required" }),
        { status: 400 }
      );
    }

    const record = await EmaiOtp.findOne({ email });
    if (!record) {
      return new Response(
        JSON.stringify({ success: false, verified: false }),
        { status: 200 }
      );
    }

    // ✅ Check if user has been marked verified
    const verified = record.verified === true;

    return new Response(
      JSON.stringify({ success: true, verified }),
      { status: 200 }
    );
  } catch (err) {
    console.error("check-verified error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}


