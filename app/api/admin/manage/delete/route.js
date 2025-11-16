import dbConnect from "@/lib/mongodb";
import AddProduct from "@/models/addproduct";

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return new Response(JSON.stringify({ success: false, error: "Product ID required" }), { status: 400 });

    const deleted = await AddProduct.findByIdAndDelete(id);

    if (!deleted) return new Response(JSON.stringify({ success: false, error: "Product not found" }), { status: 404 });

    return new Response(JSON.stringify({ success: true, message: "Product deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
