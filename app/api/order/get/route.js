import connectDB from "@/lib/mongodb";
import order from "@/models/order";
export async function GET() {
  try {
  
    await connectDB();

    // Find the user in DB
    const Order = await order.find({});

    if (!Order) {
      return new Response(
        JSON.stringify({ success: false, error: "Cart Orders not found" }),
        { status: 404 }
      );
    }

    // Return cart products
    return new Response(
      JSON.stringify({ success: true, order :Order }),
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
