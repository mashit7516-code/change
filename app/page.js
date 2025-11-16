import Image from "next/image";
import Carousel from "../components/Carousel"
import Link from "next/link";
import Stack from "@/components/StackWrapper";

export default function Home() {

  
const images = [
  { id: 1, img: "/shirts.png" },
  { id: 2, img: "/hoodies.png" },
  { id: 3, img: "/pants.png" },
  { id: 4, img: "/trouser.png" }
];

  return (
  <div className=" md:h-auto">
      
    <section className="md:min-h-[95vh] max-h-fit flex flex-col sm:flex-row gap-10">
      <div className="flex flex-col sm:mt-0 mt-14  gap-4 justify-center  items-center h-full">
       
        <div className="flex gap-8  justify-center items-center mt-30">
        <span className="sm:text-9xl font-bold text-7xl">Change</span>
        </div>
<div className="flex justify-center items-center  flex-col">
<span className="sm:text-3xl text-2xl font-semibold">Brings Comfort</span>
<p className="sm:w-[50vw] w-[80vw] sm:text-xl text-lg text-center p-3">
At Change – Brings Comfort, we believe small changes create big comfort. Our store brings thoughtfully selected products that enhance your daily routine with ease and elegance.</p>
</div>
<div className="buttons flex justify-center items-center gap-4">
  <Link href="/products"><button className="bg-black px-2 py-2 rounded-full active:scale-95 outline-2 outline-white text-white cursor-pointer">View Our Products</button>
  </Link>

</div>
  </div>
<div className="mt-40">
<Stack
randomRotation={true}
sensitivity={180}
sendToBackOnClick={true}
cardDimensions={{width:400,height:400}}
cardsData={images}
/>
</div>
    </section>
    <div className="h-1 bg-black w-full hidden md:block "></div>
    <section className="my-4 relative h-fit sm:min-h-screen">
      <div className="text-4xl font-bold text-center text-black my-4">What's New</div>
            <Carousel/>
            <div className="text-center  text-white font-bold mt-6"><Link className="bg-black px-2 py-1 rounded-full text-lg" href={"/"}>Learn More</Link></div>
    </section>
    <div className="h-1  w-full my-4 "></div>
    <section className="relative min-h-screen">
      <div className="cards w-[80%] p-4 mx-auto flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="shirts sm:w-[25%] w-[90%] justify-center items-center flex flex-col gap-4 border-2 border-black rounded-lg bg-[rgba(255,255,255,0.1)] backdrop:blur-xs backdrop:brightness-110 px-4 py-4">
          <Image className="object-cover" src="/shirts.png" height={100} width={100} alt="shirts"/>
          <div className="flex flex-col gap-2">
          <h2 className="font-bold text-center text-2xl">Shirts</h2>
          <p className="text-center">
            Our shirts are crafted for effortless everyday style — soft, breathable, and perfectly tailored. At Change – Brings Comfort, every shirt is designed to keep you confident, comfortable, and ready for any moment.</p>
          </div>
          <Link href="/products/shirts" className="bg-white hover:font-bold text-black rounded-full p-1 active:scale-95 cursor-pointer">Visit Now</Link>
        </div>
        <div className="shirts sm:w-[25%] w-[90%] justify-center items-center flex flex-col gap-4 border-2 border-black rounded-lg bg-[rgba(255,255,255,0.1)] backdrop:blur-xs backdrop:brightness-110 px-4 py-4">
          <Image className="object-cover" src="/hoodies.png" height={100} width={100} alt="shirts"/>
          <div className="flex flex-col gap-2">
          <h2 className="font-bold text-center text-2xl">Hoodies</h2>
          <p className="text-center">Soft, cozy, and built for everyday wear — our hoodies deliver warmth with a clean modern style. Change – Brings Comfort makes sure you feel relaxed, confident, and comfortable wherever you go.
          </p>
          </div>
          <Link href="/products/hoodies" className="bg-white hover:font-bold text-black rounded-full p-1 active:scale-95 cursor-pointer">Visit Now</Link>
        </div>
        <div className="shirts sm:w-[25%] w-[90%] justify-center items-center flex flex-col gap-4 border-2 border-black rounded-lg bg-[rgba(255,255,255,0.1)] backdrop:blur-xs backdrop:brightness-110 px-4 py-4">
          <Image className="object-cover" src="/pants.png" height={100} width={100} alt="shirts"/>
          <div className="flex flex-col gap-2">
          <h2 className="font-bold text-center text-2xl">Pants</h2>
          <p className="text-center">
          Made for movement and all-day ease, our pants combine modern fits with durable, light-weight fabrics. Experience comfort without losing the clean look you want — only at Change – Brings Comfort.</p>
          </div>
          <Link href="/products/pants" className="bg-white hover:font-bold text-black rounded-full p-1 active:scale-95 cursor-pointer">Visit Now</Link>
        </div>
        <div className="shirts sm:w-[25%] w-[90%] justify-center items-center flex flex-col gap-4 border-2 border-black rounded-lg bg-[rgba(255,255,255,0.1)] backdrop:blur-xs backdrop:brightness-110 px-4 py-4">
          <Image className="object-cover" src="/trouser.png" height={100} width={100} alt="shirts"/>
          <div className="flex flex-col gap-2">
          <h2 className="font-bold text-center text-2xl">Trousers</h2>
          <p className="text-center">
           Our trousers bring a polished yet relaxed feel. Designed with premium stitching, smooth fabric, and a fit that stays sharp — Change ensures comfort meets class in every pair.</p>
          </div>
          <Link href="/products/trouser" className="bg-white hover:font-bold text-black rounded-full p-1 active:scale-95 cursor-pointer">Visit Now</Link>
        </div>
      </div>
    </section>
   </div>
);
}
