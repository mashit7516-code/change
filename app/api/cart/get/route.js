// /api/cart/get.js
import { auth } from "@/auth"; // v5 session helper
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import addproduct from "@/models/addproduct";
export async function GET() {
  try {
    // Get the current session
    const session = await auth();

    if (!session || !session.user?.email) {
      return new Response(
        JSON.stringify({ success: false, error: "Not logged in" }),
        { status: 401 }
      );
    }

    await connectDB();

    // Find the user in DB
    const user = await User.findOne({ email: session.user.email }).populate("cart.productId");

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "User not found" }),
        { status: 404 }
      );
    }

    // Return cart products
    return new Response(
      JSON.stringify({ success: true, cart: user.cart || [] }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Get cart error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
