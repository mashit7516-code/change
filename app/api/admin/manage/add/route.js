import connectDB from "@/lib/mongodb"
import AddProduct from "@/models/addproduct";

export async function POST(request) {
    try{
  await connectDB();
  const { title, price, imageUrl, description, catogery, firstsuppimg ,secondsuppimg } = await request.json(); 
  
  const doc = await AddProduct.findOne({ title });
  if (doc) {
    return new Response(JSON.stringify({success : false , message: "Product with this title already exists" }), { status: 400 , headers: { "Content-Type": "application/json" } });
  }else{
const newProduct = await AddProduct.create({
    title,
    price,
    imageUrl,
    description,
    catogery,
    firstsuppimg,
    secondsuppimg,
});
return new Response(JSON.stringify({success:true, message: "Product added successfully" }), { status: 201 , headers: { "Content-Type": "application/json" } });
  }
 } 
catch (error) {
    return new Response(JSON.stringify({success:false, message: error }), { status: 500 , headers: { "Content-Type": "application/json" } });
  }   
}
