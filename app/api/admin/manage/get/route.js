import connectDB from "@/lib/mongodb";
import AddProduct from "@/models/addproduct";

export async function GET() {
    try{
  await connectDB();
    const products = await AddProduct.find({});
    if (!products){
      return new Response(JSON.stringify({success:false,products,message:"No Product found"}),{status:404, headers: { "Content-Type": "application/json" } });
    }else if(products=={} || products.length===0){
      return new Response(JSON.stringify({success:false,products,message:"No Product found"}),{status:404, headers: { "Content-Type": "application/json" } });
    }else{
      return new Response(JSON.stringify({success: true , products , message:"Products found"}), { status: 200 , headers: { "Content-Type": "application/json" } });
    }
    } catch (error) {
    return new Response(JSON.stringify({message: "Error happened while fetching products" }), { status: 500 , headers: { "Content-Type": "application/json" } });
  }
}