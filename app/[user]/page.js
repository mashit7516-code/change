"use client"
import React, { useEffect , useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'
import Link from 'next/link'
function Page() {
  const params = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = params.user;
  const [cartproduct, setcartproduct] = useState([])

  // Redirect if not logged in
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/signup");
    }
  }, [session, status, router]);
  useEffect(() => {
   const handlegetcartproducts = async () => { 
  if (session) {
    try {
      const res = await fetch("/api/cart/get", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setcartproduct(data.cart || []);
      console.log("Cart data:", data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching cart");
    }
  } else {
    toast.error("Not logged in");
  }
};

      

    handlegetcartproducts()
  }, [session])

  const handledeletecartproducts = async (id) => { 
    try {
     
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "productId": id ,
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

const res = await fetch("http://localhost:3000/api/cart/remove", requestOptions)
const result = await res.json()
if(result.success){
  toast.success("Deleted Successfully!")
  setcartproduct(prev => prev.filter(item => item._id !== id));
}else{
  toast.error("Erro Occured")
} 
    } catch (error) {
 toast.error("Could Not Delete Because An Error Occured")     
    }

  
   }
  if (status === "loading") {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <Loader/>
      </div>
    );
  }


  

  if (!session) return null; // Will redirect

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <div className="mt-30 flex flex-col gap-2 justify-center items-center">
        <span className="text-5xl font-bold text-center">Hi, {decodeURIComponent(user)}</span>
        <span className="w-[50%] text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas praesentium at ipsum? Corporis et, nulla veritatis quod voluptates atque sint magni voluptate reprehenderit. Eligendi corporis nihil voluptatibus velit, neque ad.
        </span>
      </div>

      <div className="w-[50vw] self-center h-1 bg-white my-4"></div>

      <div className="flex flex-col justify-start w-full items-start">
        <span className="text-3xl ml-10 font-bold">Cart</span>
        <div>
          {cartproduct.length == 0 ? <div className='font-bold ml-10 text-2xl'>
            No Products in Cart
          </div>
          :
           <div className="flex md:grid md:grid-cols-3 mt-4 p-2 w-[90vw] flex-col gap-4 ml-10">
    {cartproduct.map((item) => (
      <div key={item._id} className="flex border-2 border-white  items-center justify-between w-full gap-4">
        <div className='flex gap-4'>
          <img src={item.productId.imageUrl || "/logo.png"} className="w-24 h-24 object-contain" />
        <div>
          <h2 className="font-bold">{item.productId.title}</h2>
          <p>Rs. {item.productId.price}</p>
          <p>Quantity: {item.quantity}</p>
          
        </div>
        </div>
        
        <div className='cursor-pointer active:scale-95' >
               <span onClick={()=>handledeletecartproducts(item._id)} className="material-symbols-outlined cursor-pointer active:scale-95">delete</span>
        </div>

      </div>
    ))}
    <div>
       <Link href={`${user}/order`}>
                                <button className='border-2 border-black px-6 py-3 rounded-lg hover:invert-100 active:scale-95 bg-black'>
                                    Buy Now
                                </button>
                                </Link>
    </div>
  </div>}
        </div>
      </div>

      <div className="flex flex-col justify-center w-full items-start">
        <span className="text-3xl ml-10 font-bold">Orders</span>
        <div></div>
      </div>
    </div>
  );
}

export default Page;
