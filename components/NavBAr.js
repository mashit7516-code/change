"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname()
  const showNavbar = ["/admin/manage"].includes(pathname)
  const { data: session } = useSession();
  return (<>{!showNavbar &&
    <nav className="flex p-0.5 w-[80vw] z-50 border-2 border-black fixed top-10 right-[10vw] bg-[rgba(255,255,255,0.1)] justify-between items-center h-fit rounded-full backdrop-blur-md">
      {/* Logo */}
      <div className="logo flex">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/logo.png"
            className=" rounded-lg ml-6"
            width={70}
            height={200}
            alt="logo"
          />
          <span className="text-3xl font-bold text-white">Change</span>
        </Link>
      </div>

      {/* Hamburger Button (visible on mobile) */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden mr-6 text-white focus:outline-none"
      >
        <span className="material-symbols-outlined text-3xl">
          {open ? "close" : "menu"}
        </span>
      </button>

      {/* Nav Links */}
      <div
        className={`${open ? "flex" : "hidden"
          } flex-col md:flex md:flex-row md:static absolute top-20 right-0 md:top-0 md:right-auto 
        bg-[rgba(0,0,0,0.7)] md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none 
        items-center w-[70vw] md:w-fit gap-4 md:gap-6 transition-all duration-300`}
      >
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 items-center text-white">
          <Link href="/" className="hover:scale-105 active:scale-95 hover:bg-black rounded-full px-2 py-2">
            <li className="flex items-center gap-1">
              <span className="material-symbols-outlined">home</span>Home
            </li>
          </Link>
          <Link href="/products" className="hover:scale-105 active:scale-95 hover:bg-black rounded-full px-2 py-2">
            <li className="flex items-center gap-1">
              <span className="material-symbols-outlined">apparel</span> Products
            </li>
          </Link>
          <Link href="/contact" className="hover:scale-105 active:scale-95 hover:bg-black rounded-full px-2 py-2">
            <li className="flex items-center gap-1">
              <span className="material-symbols-outlined">support_agent</span> Contact
            </li>
          </Link>
          
              {
                session ?   <div className="flex justify-center items-center">
                  <Link href={`/${session.user?.name }`} className="hover:scale-105 text-white active:scale-95  rounded-full px-2 py-2">
            <li className="flex items-center gap-1 w-[69%] overflow-hidden text-green-200 hover:underline">
              <span className="material-symbols-outlined ">person</span> {session.user?.name}
            </li>
          </Link>
               <button onClick={() => signOut({ callbackUrl: "/" })}  className="bg-white text-black  hover:font-bold rounded-full px-2 py-1 font-semibold active:scale-95 hover:invert-100">
                Log Out
              </button> 
              </div> :  <div className="flex gap-2 md:flex-row flex-col">
              <Link href="/login"> <button className="bg-white text-black  hover:font-bold rounded-full px-2 py-1 font-semibold active:scale-95 hover:invert-100">
                Log in
              </button>
              </Link>
              <Link href="/signup"><button className="bg-black rounded-full px-2 hover:font-bold py-1 font-semibold active:scale-95 hover:invert-100">
                Sign Up
              </button>
              </Link>
            </div>
          
              }
            
              
            
        

        </ul>
      </div>
    </nav>
  }</>
  );
}

export default NavBar;
