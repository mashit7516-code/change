import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
function Footer() {
  return (
    <div className='bg-black mt-10 pr-0 max-w-screen p-8 flex justify-center items-center m-0  gap-4 flex-col text-gray-400' >
      <span>Copyright © 2025 Change. All rights reserved.</span>
      <span>Made with &hearts; by Ali Hassan</span>
        
<div className='flex justify-around w-full'>
          <ul>
          <li><Link href={"/"} >Home</Link></li>
          <li><Link href={"/products"} >Products</Link></li>
          <li><Link href={"/products/shirts"} >Shirts</Link></li>
          <li><Link href={"/products/pants"} >Pants</Link></li>
          <li><Link href={"/products/hoodies"} >Hoodies</Link></li>
          <li><Link href={"/products/trouser"} >Trousers</Link></li>
        </ul>
        <ul>
          <li><Link href={"/signup"} >Sign Up</Link></li>
          <li><Link href={"/login"} >Login</Link></li>
        </ul>
        <ul>
          <li><Link href={"/termsandpolicy"} >Terms & Condition</Link></li>
          <li><Link href={"/privacypolicy"} >Privacy Policy</Link></li>
        </ul>
</div>
    <ul className='flex gap-4'>
      <Link href={"/"}><li><Image className='invert-100' src="/insta.svg" width={20} height={20} alt='social-media-icon'/></li></Link>  
      <Link href={"/"}><li><Image className='invert-100' src="/facebook.svg" width={20} height={20} alt='social-media-icon'/></li></Link>  
      <Link href={"/"}><li><Image className='invert-100' src="/tiktok.svg" width={20} height={20} alt='social-media-icon'/></li></Link>  
      <Link href={"/"}><li><Image className='invert-100' src="/mail.svg" width={35} height={35} alt='social-media-icon'/></li></Link>  
    </ul>
      </div>
    
  )
}

export default Footer
