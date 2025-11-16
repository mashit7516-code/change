"use client";

import Image from "next/image";
import Carousel from "../components/Carousel";
import Link from "next/link";
import Stack from "@/components/StackWrapper";
import { useEffect, useState } from "react";

export default function Home() {
  const images = [
    { id: 1, img: "/shirts.png" },
    { id: 2, img: "/hoodies.png" },
    { id: 3, img: "/pants.png" },
    { id: 4, img: "/trouser.png" },
  ];

  // Optional: get window width for responsive Stack
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Card width capped at 90% of viewport on mobile
  const stackCardWidth = Math.min(400, windowWidth * 0.9);

  return (
    <div className="md:h-auto overflow-x-hidden">
      {/* Hero Section */}
      <section className="md:min-h-[95vh]  flex flex-col sm:flex-row gap-10 px-4 sm:px-10">
        <div className="flex flex-col justify-center items-center sm:items-start gap-4 mt-14 sm:mt-0 text-center sm:text-left">
          <h1 className="text-7xl sm:text-9xl mt-30 font-bold">Change</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mt-2">Brings Comfort</h2>
          <p className="sm:w-[50vw] w-full sm:text-xl text-lg mt-2">
            At Change – Brings Comfort, we believe small changes create big comfort. Our store brings thoughtfully selected products that enhance your daily routine with ease and elegance.
          </p>
          <Link href="/products">
            <button className="bg-black text-white px-4 py-2 rounded-full mt-4 active:scale-95">
              View Our Products
            </button>
          </Link>
        </div>

        <div className="flex justify-center items-center mt-10 sm:mt-0 w-full">
          <div className="w-full mt-20 max-w-[90vw]">
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={true}
              cardDimensions={{ width: stackCardWidth, height: stackCardWidth }}
              cardsData={images}
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 bg-black w-full my-4"></div>

      {/* What's New Section */}
      <section className="my-4 relative min-h-[50vh] sm:min-h-screen px-4 sm:px-10">
        <h2 className="text-4xl font-bold text-center text-black my-4">What's New</h2>
        <Carousel />
        <div className="text-center mt-6">
          <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-lg">
            Learn More
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 bg-black w-full my-4"></div>

      {/* Products Section */}
      <section className="relative min-h-screen px-4 sm:px-10">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6">
          {/* Product Card */}
          {[
            { title: "Shirts", img: "/shirts.png", href: "/products/shirts", desc: "Our shirts are crafted for effortless everyday style — soft, breathable, and perfectly tailored. At Change – Brings Comfort, every shirt is designed to keep you confident, comfortable, and ready for any moment." },
            { title: "Hoodies", img: "/hoodies.png", href: "/products/hoodies", desc: "Soft, cozy, and built for everyday wear — our hoodies deliver warmth with a clean modern style. Change – Brings Comfort makes sure you feel relaxed, confident, and comfortable wherever you go." },
            { title: "Pants", img: "/pants.png", href: "/products/pants", desc: "Made for movement and all-day ease, our pants combine modern fits with durable, light-weight fabrics. Experience comfort without losing the clean look you want — only at Change – Brings Comfort." },
            { title: "Trousers", img: "/trouser.png", href: "/products/trouser", desc: "Our trousers bring a polished yet relaxed feel. Designed with premium stitching, smooth fabric, and a fit that stays sharp — Change ensures comfort meets class in every pair." },
          ].map((product) => (
            <div
              key={product.title}
              className="flex flex-col gap-4 justify-center items-center w-full sm:w-[22%] min-w-[250px] border-2 border-black rounded-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-xs backdrop-brightness-110 px-4 py-4 text-center"
            >
              <Image src={product.img} height={100} width={100} alt={product.title} className="object-cover" />
              <h3 className="text-2xl font-bold">{product.title}</h3>
              <p className="text-sm sm:text-base">{product.desc}</p>
              <Link
                href={product.href}
                className="bg-white text-black rounded-full p-1 mt-2 active:scale-95 hover:font-bold"
              >
                Visit Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
