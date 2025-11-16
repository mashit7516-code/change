import connectDB from "@/lib/mongodb";
import addproduct from "@/models/addproduct";


export async function POST(req) {
  try {
    const { productId } = await req.json();

    if (!productId) {
         return new Response(
        JSON.stringify({ success: false, error: "Product Not given!" }),
        { status: 400 }
      );}

    await connectDB();

    const product = await addproduct.findById(productId);

    if (!product) {
        return new Response(
        JSON.stringify({ success: false, error: "Product Not found" }),
        { status: 404 }
      );    }
    return new Response(
        JSON.stringify({ success: true ,product }),
        { status: 200 }
      );
  } catch (err) {
    console.error(err);    return new Response(
        JSON.stringify({ success: false, error: "Internal Server Error" }),
        { status: 500 }
      );}
}
