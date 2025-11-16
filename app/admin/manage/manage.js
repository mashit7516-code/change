"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [catogery, setcatogery] = useState("shirts")
  const [products, setproducts] = useState([])
  const [firstsuppimg, setfirstsuppimg] = useState("")
  const [secondsuppimg, setsecondsuppimg] = useState("")
const [order, setorder] = useState([])
  useEffect(() => {
    const findproducts = async () => {
      try {
        const res = await fetch("/api/admin/manage/get")
        const data = await res.json()
        if (data.success) {
          setproducts(data.products)
            toast(data.message) 
        } else {
          toast.info(data.message)
          
        }
      } catch (error) {
        toast.error(error)
      }

    }
    findproducts()
  }, [])


const handleedit = async (id) => {
  if (!confirm("Are you sure you want to edit this product?")) return;

  try {
    // Delete the product from DB
    const res = await fetch(`/api/admin/manage/delete?id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      // Remove from UI
      setproducts(products.filter(p => p._id !== id));
let product = products.find(p => p._id === id);
      // Fill form inputs
      setTitle(product.title);
      setDescription(product.description);
      setImageUrl(product.imageUrl);
      setPrice(product.price);
      setfirstsuppimg(product.setfirstsuppimg)
      setsecondsuppimg(product.setsecondsuppimg)
      toast.success("Product ready to edit!");
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const handledelete = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch(`/api/admin/manage/delete?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json(); // parse JSON response

    if (data.success) {
      toast.success(data.message);
      // Remove deleted product from UI
      setproducts(products.filter((p) => p._id !== id));
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  const handlesubmit = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "title": title,
      "price": parseFloat(price),
      "imageUrl": imageUrl,
      "description": description,
      "catogery": catogery,
      "firstsuppimg":firstsuppimg,
      "secondsuppimg":secondsuppimg,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const res = await fetch("/api/admin/manage/add", requestOptions)
    const result = await res.json();
    if (result.success) {
      setTitle("");
      setPrice("");
      setImageUrl("");
      setDescription("");
      setcatogery("shirts");
      setfirstsuppimg("")
      setsecondsuppimg("")
      toast.success(result.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(result.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
console.log(result.error)
    }
  }

useEffect(() => {
  const handlegetorder = async () => { 
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    const r = await fetch("/api/order/get", requestOptions);
    const result = await r.json();

    if(result.success){
      toast.success("Orders Found");
      setorder(result.order); 
      console.log(order)
    }else{
      toast.info(order.message)
    }
  };

  handlegetorder();
}, []);



  
  return (
    <div className="flex w-full flex-col justify-center items-center h-fit">
      <h1 className="md:text-5xl text-3xl mt-30 bg-black w-fit font-bold rounded-lg p-1">
        Admin Management Page
      </h1>
      <div>
        <nav>
          <ul className="bg-black text-xl flex gap-2 p-2 mt-4 m-2 rounded-lg ">
            <li className="hover:invert-100 bg-black rounded-lg p-1"><a className="scroll-smooth" href="#addproducts">Add products</a></li>
            <li className="hover:invert-100 bg-black rounded-lg p-1"><a className="scroll-smooth" href="#manageproducts">Manage products</a></li>
            <li className="hover:invert-100 bg-black rounded-lg p-1"><a className="scroll-smooth" href="#order">Orders</a></li>
          </ul>
        </nav>
      </div>
      <section id="addproducts" className="min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl w-fit mt-10 mb-5 font-semibold bg-black p-1 rounded-lg">
            Manage Products
          </h2>
          <h3 className="text-xl text-center w-fit self-center bg-black p-1 rounded-lg">
            Add Product
          </h3>
        </div>

        <form
          onSubmit={handlesubmit}
          className="flex flex-col justify-center items-center mt-5 mb-10  w-[90vw]"
        >
          <input
            type="text"
            name="title"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Title"
            required
            className="mb-3 p-1 rounded-lg outline-2 outline-purple-950 focus:outline-black w-[80%] bg-white text-black"
          />
          <input
            type="number"
            name="price"
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            required
            className="mb-3 p-1 rounded-lg outline-2 outline-purple-950 focus:outline-black w-[80%] bg-white text-black"
          />
          <select className="mb-3 p-1 rounded-lg outline-2 outline-purple-950 focus:outline-black w-[80%] bg-white text-black"
           name="catogery" onChange={(e)=>setcatogery(e.target.value)} id="catogery">
            <option value= {"shirts"}>Shirts</option>
            <option  value= {"hoodies"}>Hoodies</option>
            <option  value= {"trousers"}>Trousers</option>
            <option  value= {"pants"}>pants</option>
          </select>
          <input
          type="text"
          name="image"
          value={imageUrl || ""}
          placeholder="Enter Image URL"
          onChange={(e)=>setImageUrl(e.target.value)}
          required
          className="mb-3 p-1 rounded-lg outline-2 outline-purple-950 focus:outline-black w-[80%] bg-white text-black"
          />
          <input
          type="text"
          name="suppimage1"
          value={firstsuppimg || ""}
          placeholder="Enter 1st supporting Image URL"
          onChange={(e)=>setfirstsuppimg(e.target.value)}
          required
          className="mb-3 p-1 rounded-lg outline-2 outline-purple-950 focus:outline-black w-[80%] bg-white text-black"
          />
          <input
          type="text"
          name="suppimage2"
          value={secondsuppimg || ""}
          placeholder="Enter 2nd supporting Image URL"
          onChange={(e)=>setsecondsuppimg(e.target.value)}
          required
          className="mb-3 p-1 rounded-lg outline-2 outline-purple-950 focus:outline-black w-[80%] bg-white text-black"
          />
          <textarea
            name="description"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
            required
            className="mb-3 p-1 rounded-lg outline-2 outline-purple-950 focus:outline-black w-[80%] bg-white text-black"
          ></textarea>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg active:scale-95 hover:invert-100 transition-all duration-200"
          >
            Add Product
          </button>
        </form>
      </section>
        <div className="h-1 bg-black w-full"></div>
      <section id="manageproducts" className="min-h-screen w-screen flex justify-center items-center flex-col ">
        <div className="text-3xl font-bold text-black">Manage Products</div>
        {products.length === 0 ? (
          <p className="text-3xl font-bold">Products Not Found</p>
        ) : (
          <div className="w-[98vw] flex justify-center items-center flex-col">
            {products.map(i => (
              <div key={i._id} className="flex md:flex-row flex-col justify-between max-w-fit min-w-[60%] w-fit bg-[rgba(255,255,255,0.1)] rounded-lg p-1  mt-10  items-center">
                <div><Image src={i.imageUrl} height={100} width={100} alt="product-image" /></div>
               <div className="flex h-fit flex-col justify-center items-center w-fit ">
                <div className="text-2xl font-bold ">{i.title}</div>
                <p className="w-[40%]  h-auto wrap-normal">{i.description}</p>
                <span>Catogery : {i.catogery}</span>
                </div>
                <div className="text-gray-200">Rs.{i.price}</div>
                <div className="flex gap-2">
                    <span onClick={()=>handleedit(i._id)} className="material-symbols-outlined cursor-pointer active:scale-95">edit</span>
                    <span onClick={()=>handledelete(i._id)} className="material-symbols-outlined cursor-pointer active:scale-95">delete</span>
                </div>
              </div>
            ))}
          </div>
        )

        }
      </section>
      <div className="h-1 bg-black w-full "></div>
      <section id="order my-4">
        <div>{ order.length == 0 ? <div>No Order Found</div> : 

  <div className=" w-screen">
    <div className="my-6 font-bold text-2xl mx-auto w-fit ">Orders :</div>
    {order.map((o) => (
      <div key={o._id} className="p-4 w-[50%] text-xl font-semibold mx-auto container border mb-4">
        <p>Name: {o.name}</p>
        <p>Phone: {o.phone}</p>

        <h3>Items:</h3>
        {o.cartItems.map((item) => (
          <div key={item._id} className="ml-4">
            <p>Title: {item.title}</p>
            <p>Price: {item.price}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        ))}

        <p>Total: {o.totalAmount}</p>
        <p>Status: {o.status}</p>
      </div>
    ))}
  </div>
  }      
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
