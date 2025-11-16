"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
"/corusel.png",
"/corusel.png",
"/corusel.png",
"/corusel.png",
"/corusel.png",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(timer);
  }, [length]);

  const nextSlide = () => setCurrent((current + 1) % length);
  const prevSlide = () => setCurrent((current - 1 + length) % length);

  return (
    <div className="relative w-screen mx-auto h-64 md:h-96 overflow-hidden rounded-xl border border-gray-800 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm">
      {/* Images */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="shrink-0 w-full h-64 md:h-96 relative">
            <Image
              src={src}
              alt={`Slide ${index}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
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

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-green-500 scale-110" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

