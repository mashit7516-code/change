import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const session = await auth();
    console.log("Session:", session);
    
    if (!session || !session.user?.email) {
      return new Response(
        JSON.stringify({ success: false, error: "Not logged in" }), 
        { status: 401 }
      );
    }

    const { productId, quantity } = await req.json();
    if (!productId) {
      return new Response(
        JSON.stringify({ success: false, error: "Product ID required" }), 
        { status: 400 }
      );
    }

    // Validate and parse quantity
    const qty = parseInt(quantity) || 1;
    if (qty < 1) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid quantity" }), 
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "User not found" }), 
        { status: 404 }
      );
    }

    // Add product to cart with specified quantity
    const cartItemIndex = user.cart.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (cartItemIndex > -1) {
      // Add the specified quantity to existing quantity
      user.cart[cartItemIndex].quantity += qty;
    } else {
      // Create new cart item with specified quantity
      user.cart.push({ productId, quantity: qty });
    }

    await user.save();
    return new Response(
      JSON.stringify({ success: true, message: "Product added to cart" }), 
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }), 
      { status: 500 }
    );
  }
}