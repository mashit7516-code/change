import dbConnect from "@/lib/mongodb";
import order from "@/models/order";
import addproduct from "@/models/addproduct";
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { productId, quantity, name, phone, address, userEmail, transactionId } = body;

    if (!productId || !quantity || !name || !phone || !transactionId) {
      return Response.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // Fetch product
    const product = await addproduct.findById(productId);
    if (!product) {
      return Response.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Prepare 1-item order
    const cartItems = [
      {
        productId,
        title: product.title,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl,
      },
    ];

    const totalAmount = product.price * quantity;

    const Order = await order.create({
      userEmail,
      name,
      phone,
      address,
      cartItems,
      totalAmount,
      transactionId
    });

    return Response.json(
      { success: true, order },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
