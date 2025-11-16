"use client"
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Loader from '@/components/Loader'
import { ToastContainer , toast } from 'react-toastify'
function Order() {
  const { data: session, status } = useSession()
  const params = useParams()
  const id = params.id
  const router = useRouter()

  // Form state
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [village, setVillage] = useState('')
  const [tehsil, setTehsil] = useState('')
  const [district, setDistrict] = useState('')
  const [division, setDivision] = useState('')
  const [province, setProvince] = useState('')
const [TID, setTID] = useState('')
const [error, seterror] = useState(true)
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/signup")
    }
  }, [session, status, router])
  useEffect(() => {
  if (
    name === "" ||
    phone === "" ||
    village === "" ||
    tehsil === "" ||
    district === "" ||
    division === "" ||
    province === "" ||
    TID === ""
  ) {
    seterror(true);
  } else {
    seterror(false);
  }
}, [name, phone, village, tehsil, district, division, province, TID]);


  if (!session) return null

  const handleSubmit = async (e) => {
  e.preventDefault();

  const orderData = {
    name,
    phone,
    address: { village, tehsil, district, division, province },
    transactionId: TID,
  };

  try {
    const res = await fetch("/api/order/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("✅ Order placed successfully!");
      router.push("/ordersuccess");
    } else {
      toast.error("❌ " + data.message);
    }
  } catch (err) {
    toast.error("Error placing order: " + err.message);
  }
};


  

  return (
    <div className='min-h-screen flex flex-col justify-center items-center p-4'>
      <div className='bg-white w-full max-w-2xl p-8 rounded-xl mt-30 shadow-lg border border-gray-200'>
        <h1 className='text-2xl md:text-3xl font-bold text-center mb-6'>
          Place Your Order
        </h1>
        <p className='text-center text-gray-500 mb-6'>
          Please fill in your details to complete your order
        </p>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          {/* Name */}
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700'>Full Name</label>
            <input 
              type="text" 
              placeholder='Enter Your Full Name' 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='rounded-lg  text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none'
            />
          </div>

          {/* Phone Number */}
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700'>Phone Number</label>
            <input 
              type="tel" 
              placeholder='Enter Your Phone Number' 
              required 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='rounded-lg  text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none' 
            />
          </div>

          {/* Address Section */}
          <h2 className='text-xl font-semibold text-gray-800 mt-4 mb-2'>Address</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label className='font-medium text-gray-700'>Village/Town/City</label>
              <input 
                type="text" 
                placeholder='Enter Your Village/Town/City' 
                required 
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className='rounded-lg  text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-medium text-gray-700'>Tehsil</label>
              <input 
                type="text" 
                placeholder='Enter Your Tehsil' 
                required 
                value={tehsil}
                onChange={(e) => setTehsil(e.target.value)}
                className='rounded-lg  text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-medium text-gray-700'>District</label>
              <input 
                type="text" 
                placeholder='Enter Your District' 
                required 
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className='rounded-lg  text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-medium text-gray-700'>Division/City</label>
              <input 
                type="text" 
                placeholder='Enter Your Division/City' 
                required 
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className='rounded-lg  text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              />
            </div>

            <div className='flex flex-col'>
              <label >Province</label>
              <input 
                type="text" 
                placeholder='Enter Your Province' 
                required 
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className='rounded-lg  text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              />
            </div>
          </div>
            <div className='font-medium text-gray-700'>
              <div>
Payment Method:
COD (Cash on delivery)
<div>
  Delivery Fee : PKR 300/-
  <div>
    Payemnt Instruction:
    Pay the amount with help of Number 03037833380 . Name : Amna Bashir. After your payment is done. You will get an Transiction ID. Enter Transaction ID to confirm your order. After verifying your Transaction ID You will receive an Email from us that your order is placed successfully and you will receive the anticipated date of order arrival in the Email.
  </div>
   <div className='flex flex-col'>
              <label >Transaction ID</label>
              <input 
                type="text" 
                placeholder='Enter Your Transaction' 
                required 
                value={TID}
                onChange={(e) => setTID(e.target.value)}
                className='rounded-lg  text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              />
            </div>
</div>
</div>
            </div>

          {/* Submit Button */}
          <button 
          disabled={error}
            type="submit"
            className='disabled:opacity-50 disabled:cursor-not-allowed mt-6 bg-green-600 text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition'
          >
            Place Order
          </button>
        </form>
      </div>
      <ToastContainer
      position='bottom-right'/>
    </div>
  )
}

export default Order
