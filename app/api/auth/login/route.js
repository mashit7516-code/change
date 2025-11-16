import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt"
export async function POST(req) {
    try {
        await connectDB(); // Ensure DB connection
    const { email, password } = await req.json();

     if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: "Email and password are required" }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
     const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);
    if (existingUser && isPasswordValid) {
      return new Response(
        JSON.stringify({ success: true, error: null , message: "Login In " }),
        { status: 200 }
      );
    }else{
       return new Response(
        JSON.stringify({ success: false, error: "User Not Found" , message: "User Not Found" }),
        { status: 404 }
      );  
    }
 
    } catch (err) {
      console.error(err)
        return new Response(
        JSON.stringify({ success: false ,error:err, message: "Error Occured" }),
        { status: 500 }
      );    
    }
    
}