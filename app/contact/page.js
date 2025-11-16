import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
function contact() {
    return (
        <div className='min-h-screen flex flex-col gap-4 justify-center items-center'>
            <div className='flex flex-col mt-30'>
                <span className='text-center text-5xl font-bold'>Contact Page</span>
                <p className='w-[80%] md:w-full mt-6 text-lg'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui aliquam eum hic.
                </p>
            </div>
            <div className="social w-full">
                <div className="insta hover:text-black mx-auto my-10 md:w-[50%] w-[90%] hover:scale-110 bg-[rgba(255,255,255,0.1)] border-2 border-black p-2 flex justify-center items-center gap-4 rounded-lg cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-all">
                    <div className='flex justify-center items-center gap-2'>
                        <Image className='invert-100 group-hover:invert-0 hover:invert-0' src="mail.svg" width={150} height={100} alt='insta' />
                        <span className="text-3xl font-bold">Change</span>
                    </div>
                    <Link href="mailto:changebringscomfort@gmail.com" target="_blank" className='text-2xl hover:underline'>Email Now</Link>
                </div>
                <div className="insta hover:text-black mx-auto my-10 md:w-[50%] w-[90%] hover:scale-110 bg-[rgba(255,255,255,0.1)] border-2 border-black p-2 flex justify-center items-center gap-4 rounded-lg cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-all">
                    <div className='flex justify-center items-center gap-2'>
                        <Image className='invert-100 group-hover:invert-0 hover:invert-0' src="insta.svg" width={100} height={100} alt='insta' />
                        <span className="text-3xl font-bold">@change</span>
                    </div>
                    <Link href="https://www.instagram.com/change_brings_comfort/" target="_blank" className='text-2xl hover:underline'>Visit Now</Link>
                </div>
                <div className="facebook hover:text-black mx-auto my-10 md:w-[50%] w-[90%] hover:scale-110 bg-[rgba(255,255,255,0.1)] border-2 border-black p-2 flex justify-center items-center gap-4 rounded-lg cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-all">
                    <div className='flex justify-center items-center gap-2'>
                        <Image className='invert-100 group-hover:invert-0 hover:invert-0' src="Facebook.svg" width={100} height={100} alt='insta' />
                        <span className="text-3xl font-bold">@change</span>
                    </div>
                    <Link href="https://web.facebook.com/profile.php?id=61583449036493" target="_blank" className='text-2xl hover:underline'>Visit Now</Link>
                </div>
                <div className="insta hover:text-black mx-auto my-10 md:w-[50%] w-[90%] hover:scale-110 bg-[rgba(255,255,255,0.1)] border-2 border-black p-2 flex justify-center items-center gap-4 rounded-lg cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-all">
                    <div className='flex justify-center items-center gap-2'>
                        <Image className='invert-100 group-hover:invert-0 hover:invert-0' src="tiktok.svg" width={100} height={100} alt='insta' />
                        <span className="text-3xl font-bold">@change</span>
                    </div>
                    <Link href="https://www.tiktok.com/@change_brings_comfort/" target="_blank" className='text-2xl hover:underline'>Visit Now</Link>
                </div>
            </div>
        </div>
    )
}

export default contact
