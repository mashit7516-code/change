import { auth } from "@/auth"; // NextAuth handler
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const session = await auth(); // get user session
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ success: false, error: "Not logged in" }), { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return new Response(JSON.stringify({ success: false, error: "Product ID required" }), { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) return new Response(JSON.stringify({ success: false, error: "User not found" }), { status: 404 });

    // Remove product from cart
    user.cart = user.cart.filter(item => item._id.toString() !== productId);

    await user.save();
    return new Response(JSON.stringify({ success: true, message: "Product removed from cart" }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
