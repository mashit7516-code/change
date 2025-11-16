import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
function products() {
    return (
        <div className='flex flex-col justify-center min-h-fit h-screen items-center'>
            <div>
                <div className='flex  rounded-lg p-1 items-center justify-center mt-30 gap-2 mb-10'>
                    <span className='md:text-7xl text-5xl font-bold'>Change</span>
                </div>
                <div className='md:text-5xl text-3xl font-bold'>
                    Our Products
                </div>
            </div>
            <div className='products w-full flex flex-col items-center '>
                <Link href="/products/shirts">
                <div className='w-fit mb-10 mx-2 border-2 border-black p-1 rounded-lg bg-[rgba(255,255,255,0.1)] cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-all mt-10 hover:text-black'>
                    <div className='flex gap-4 flex-col md:flex-row justify-between items-center p-4'>
                        <Image src="/shirts.png" width={200} height={60} alt='icon'/>
                        <div className='h-1 bg-black w-full scale-110 block md:hidden'></div>
                        <div className='flex flex-col'>
                            <span className='text-3xl font-semibold '>Shirts</span>
                            <span className='text-xl w-[70%]'>Our shirts are crafted for effortless everyday style — soft, breathable, and perfectly tailored. At Change – Brings Comfort, every shirt is designed to keep you confident, comfortable, and ready for any moment.</span>
                        </div>
                        <div className='flex justify-center items-center hover:scale-110 transition-all hover:bg-[rgba(255,255,255,0.1)] rounded-full p-2'>
                            <span className="material-symbols-outlined">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                </div>
                </Link>
                <Link href="/products/hoodies">
                <div className='w-fit mb-10 mx-2 border-2 border-black p-1 rounded-lg bg-[rgba(255,255,255,0.1)] cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-all mt-10 hover:text-black'>
                    <div className='flex gap-4 flex-col md:flex-row justify-between items-center p-4'>
                        <Image src="/hoodies.png" width={200} height={60} alt='icon'/>
                        
                        <div className='flex flex-col'>
                            <span className='text-3xl font-semibold '>Hoodies</span>
                            <span className='text-xl w-[70%]'>Soft, cozy, and built for everyday wear — our hoodies deliver warmth with a clean modern style. Change – Brings Comfort makes sure you feel relaxed, confident, and comfortable wherever you go.</span>
                        </div>
                        <div className='flex justify-center items-center hover:scale-110 transition-all hover:bg-[rgba(255,255,255,0.1)] rounded-full p-2'>
                            <span className="material-symbols-outlined">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                </div>
                </Link>
                <Link href="/products/pants">
                <div className='w-fit mb-10 mx-2 border-2 border-black p-1 rounded-lg bg-[rgba(255,255,255,0.1)] cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-all mt-10 hover:text-black'>
                    <div className='flex gap-4 flex-col md:flex-row justify-between items-center p-4'>
                        <Image src="/pants.png" width={200} height={60} alt='icon'/>
                        
                        <div className='flex flex-col'>
                            <span className='text-3xl font-semibold '>Pants</span>
                            <span className='text-xl w-[70%]'>Made for movement and all-day ease, our pants combine modern fits with durable, light-weight fabrics. Experience comfort without losing the clean look you want — only at Change – Brings Comfort.</span>
                        </div>
                        <div className='flex justify-center items-center hover:scale-110 transition-all hover:bg-[rgba(255,255,255,0.1)] rounded-full p-2'>
                            <span className="material-symbols-outlined">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                </div>
                </Link>
                <Link href="/products/trouser">
                <div className='w-fit mb-10 mx-2 border-2 border-black p-1 rounded-lg bg-[rgba(255,255,255,0.1)] cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-all mt-10 hover:text-black'>
                    <div className='flex gap-4 flex-col md:flex-row justify-between items-center p-4'>
                        <Image src="/trouser.png" width={200} height={60} alt='icon'/>
                        
                        <div className='flex flex-col'>
                            <span className='text-3xl font-semibold '>Trouser</span>
                            <span className='text-xl w-[70%]'>Our trousers bring a polished yet relaxed feel. Designed with premium stitching, smooth fabric, and a fit that stays sharp — Change ensures comfort meets class in every pair.</span>
                        </div>
                        <div className='flex justify-center items-center hover:scale-110 transition-all hover:bg-[rgba(255,255,255,0.1)] rounded-full p-2'>
                            <span className="material-symbols-outlined">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default products
