"use client"
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Loader from '@/components/Loader'
function Page() {
    const [product, setproduct] = useState([])
    const [errormessage, seterrormessage] = useState("")
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    const [imageErrors, setImageErrors] = useState({}) // Track failed images

    useEffect(() => {
        const findproducts = async () => {
            try {
                const res = await fetch("/api/admin/manage/get")
                
                if (!res.ok) {
                    throw new Error("Failed to fetch products")
                }
                
                const data = await res.json()
                console.log("Raw data:", data)

                // Check if data is an array
                if (Array.isArray(data)) {
                    const filtered = data.filter(p => p.catogery === "shirts")
                    console.log("Filtered:", filtered)
                    setproduct(filtered)
                    
                    if (filtered.length === 0) {
                        seterror(true)
                        seterrormessage("No shirts found")
                    }
                } else if (data.success === false) {
                    seterror(true)
                    seterrormessage(data.message || "Failed to load products")
                } else if (data.products && Array.isArray(data.products)) {
                    const filtered = data.products.filter(p => p.catogery === "shirts")
                    setproduct(filtered)
                    
                    if (filtered.length === 0) {
                        seterror(true)
                        seterrormessage("No shirts found")
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
        
        findproducts()
    }, [])

    // Function to validate and return image URL
    const getValidImageUrl = (url, itemId) => {
        // If already marked as error, return default
        if (imageErrors[itemId]) {
            return "/logo.png"
        }

        // Check if URL is valid
        if (!url || url.trim() === "") {
            return "/logo.png"
        }

        try {
            // Try to construct URL to validate
            new URL(url, window.location.origin)
            return url
        } catch (e) {
            console.error(`Invalid URL for item ${itemId}:`, url)
            return "/logo.png"
        }
    }

    // Handle image load error
    const handleImageError = (itemId) => {
        setImageErrors(prev => ({
            ...prev,
            [itemId]: true
        }))
    }

    if (loading) {
        return (
            <div className='flex mt-30 min-h-screen bg-green-600 justify-center items-center'>
             <Loader/>
             </div>
        )
    }

    return (
        <div className='flex mt-30 min-h-screen justify-center items-center'>
            {error ? (
                <div className='font-bold text-5xl text-center'>
                    {errormessage || "No Products Found"}
                </div>
            ) : (
                <div className='w-full'>
                    <div className='flex flex-col items-center justify-center gap-4 mb-8'>
                        <span className='text-5xl font-bold'>Our Products</span>
                        <span className='font-semibold text-center'>
                         Our shirts are crafted for effortless everyday style — soft, breathable, and perfectly tailored. At Change – Brings Comfort, every shirt is designed to keep you confident, comfortable, and ready for any moment.</span>
                    </div>
                    <div className="products m-2 border-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-2 rounded-lg bg-[rgba(255,255,255,0.2)] p-4">
                        {product.map((item, index) => (
                            <Link href={`/products/shirts/${item._id}`} key={item._id || item.id || index} className="border rounded-lg p-4 bg-[rgba(255,255,255,0.2)]">
                                <div className="image">
                                    <Image 
                                        width={200} 
                                        height={200} 
                                        src={getValidImageUrl(item.imageUrl || item.img, item._id || index)} 
                                        alt={item.title || 'product image'}
                                        className="w-full h-auto"
                                        onError={() => handleImageError(item._id || index)}
                                    />
                                <div className='w-full h-1 bg-white '></div>
                                </div>
                                <div className="name font-semibold mt-2">{item.title}</div>
                                <div className='price text-lg'>Rs.{item.price}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page