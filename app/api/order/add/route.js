import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Order from "@/models/order";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ success: false, message: "Not logged in" }), { status: 401 });
    }

    const body = await req.json();
    const { name, phone, address, transactionId } = body;

    if (!name || !phone || !address || !transactionId) {
      return new Response(JSON.stringify({ success: false, message: "All fields required" }), { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email }).populate("cart.productId");

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "User not found" }), { status: 404 });
    }

    if (user.cart.length === 0) {
      return new Response(JSON.stringify({ success: false, message: "Cart is empty" }), { status: 400 });
    }

    // Calculate total
    const totalAmount =
      user.cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) + 300; // 300 delivery fee

    // Create order
    const order = new Order({
      userEmail: session.user.email,
      name,
      phone,
      address,
      transactionId,
      totalAmount,
      cartItems: user.cart.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        price: item.productId.price,
        quantity: item.quantity,
        category: item.productId.category,
        imageUrl: item.productId.imageUrl,
      })),
    });

    await order.save();

    // Clear cart
    user.cart = [];
    await user.save();

    return new Response(JSON.stringify({ success: true, message: "Order placed successfully", order }), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
