"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '@/components/Loader'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
function Page() {
    const [product, setproduct] = useState(null) // Changed to null for single product
    const [errormessage, seterrormessage] = useState("")
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    const [current, setCurrent] = useState(0);
    const [quantity, setquantity] = useState("")
    const length = 3;
    const { data: session, status } = useSession();

    const params = useParams() // Renamed from 'id' to 'params'
    const productId = params.id // Get the actual id value

    // Auto slide every 3 seconds


    useEffect(() => {
        const findproducts = async () => {
            try {
                const res = await fetch("/api/admin/manage/get")

                if (!res.ok) {
                    throw new Error("Failed to fetch products")
                }

                const data = await res.json()
                console.log("Raw data:", data)
                console.log("Looking for ID:", productId)

                // Check if data is an array
                if (Array.isArray(data)) {
                    const filtered = data.find(p => p._id === productId) // Use find() for single item
                    console.log("Found product:", filtered)

                    if (filtered) {
                        setproduct(filtered)
                        console.log(product)
                    } else {
                        seterror(true)
                        seterrormessage("Product not found")
                    }
                } else if (data.success === false) {
                    seterror(true)
                    seterrormessage(data.message || "Failed to load products")
                } else if (data.products && Array.isArray(data.products)) {
                    const filtered = data.products.find(p => p._id === productId) // Fixed filter

                    if (filtered) {
                        setproduct(filtered)
                        console.log(product)
                    } else {
                        seterror(true)
                        seterrormessage("Product not found")
                    }
                }
            } catch (error) {
                console.error("Fetch error:", error)
                seterror(true)
                seterrormessage(error.message || "Something went wrong")
            } finally {
                setloading(false)
            }
        }

        if (productId) {
            findproducts()
        }
    }, [productId]) // Added dependency

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % length);
        }, 10000);
        return () => clearInterval(timer);
    }, [length]);

    const nextSlide = () => setCurrent((current + 1) % length);
    const prevSlide = () => setCurrent((current - 1 + length) % length);

  const handleAddToCart = async () => {
    if (status === "loading") {
        toast.info("Checking login status...");
        return;
    }

    if (status === "unauthenticated" || !session) {
        toast.error("Please log in to add items to your cart");
        return;
    }

    if (!product?._id) {
        toast.error("Product not found");
        return;
    }

    // Validate quantity
    const qty = parseInt(quantity) || 1;
    if (qty < 1) {
        toast.error("Quantity must be at least 1");
        return;
    }

    try {
        const res = await fetch("/api/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                productId: product._id,
                quantity: qty  // Add quantity here
            }),
            credentials: "include",
        });

        const data = await res.json();
        if (data.success) {
            toast.success(`Added ${qty} item(s) to cart!`);
            setquantity(""); // Reset quantity input
        } else {
            toast.error(data.error || "Failed to add to cart");
        }
    } catch (err) {
        console.error(err);
        toast.error("Failed to add product to cart");
    }
};


    if (loading) {
        return (
            <div className='flex min-h-screen justify-center items-center'>
                <Loader/>
             </div>
        )
    }

    if (error) {
        return (
            <div className='flex min-h-screen justify-center items-center'>
                <div className='font-bold text-3xl text-red-600'>{errormessage}</div>
            </div>
        )
    }

    return (
        <div className='flex min-h-screen justify-center items-center p-8'>
            {product ? (
                <div className='w-[90vw] rounded-lg bg-[rgba(255,255,255,0.2)] border-2 border-white mt-30 shadow-lg p-8'>
                    <div className='flex flex-col gap-8'>

                        <div className="relative w-[80%] mx-auto h-64 md:h-96 overflow-hidden rounded-xl border border-gray-800 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm">
                            {/* Images */}
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${current * 100}%)` }}
                            >

                                <div className="shrink-0 w-full h-64 md:h-96 relative">
                                    <Image
                                        src={product.imageUrl || product.img || '/logo.png'}
                                        alt={"Main-Image"}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="shrink-0 w-full h-64 md:h-96 relative">
                                    <Image
                                        src={product.firstsuppimg || product.img || '/logo.png'}
                                        alt={"Main-Image"}
                                        fill
                                        className="object-contain"
                                    />
                                </div>     <div className="shrink-0 w-full h-64 md:h-96 relative">
                                    <Image
                                        src={product.secondsuppimg || product.img || '/logo.png'}
                                        alt={"Main-Image"}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Navigation buttons */}
                            <button
                                onClick={prevSlide}
                                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition active:scale-95"
                            >
                                ❮
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition active:scale-95"
                            >
                                ❯
                            </button>
                        </div>
                        <div>
                            <h1 className='text-4xl font-bold mb-4'>{product.title}</h1>
                            <p className='text-3xl font-semibold mb-4'>
                                Rs.{product.price}
                            </p>
                            <p className='text-gray-200 mb-4'>
                                {product.description || 'No description available'}
                            </p>
                            
                            <div className='flex flex-col gap-2 mt-4'>
    <label className='font-semibold'>Enter Quantity</label>
    <input 
        type='number' 
        min="1"
        value={quantity}
        placeholder="1"
        onChange={(e) => setquantity(e.target.value)} 
        className='text-black outline-none focus:ring-2 focus:ring-black rounded-lg p-2 w-32'
    />
</div>
                            <div className='flex gap-4 mt-6'>
                                <button onClick={handleAddToCart} className='bg-black text-white px-6 py-3 rounded-lg hover:invert-100 active:scale-95'>
                                    Add to Cart
                                </button>
                                <Link href={`/products/pants/${product._id}/order`}>
                                <button className='border-2 border-black px-6 py-3 rounded-lg hover:invert-100 active:scale-95 bg-black'>
                                    Buy Now
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No product found</div>
            )}
            <ToastContainer
                position='bottom-right' />
        </div>
    )
}

export default Page