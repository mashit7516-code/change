import "./globals.css";
import NavBAr from "../components/NavBAr";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import Silk from "@/components/Silk";
import Provider from "@/components/Provider";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Change - Brings Comfort",
  description: "A clothing brand that makes your days and nights equally full of comfort.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        
      </head>
<body
  className={`${poppins.variable} text-white bg-[url("/bg.png")] font-sans flex flex-col min-h-screen`}
>
  {/* bg-[#008f00] */}
  <Provider>
    {/* Background */}
    {/* <div className="fixed inset-0 -z-10">
      <Silk speed={20} scale={1} color="#059e00" noiseIntensity={1.5} rotation={0} />
    </div> */}

    {/* Header */}
    <NavBAr />

    {/* Main content grows to fill space */}
    <main className="relative z-10 grow">
      {children}
    </main>

    {/* Footer always at the bottom */}
    <Footer />
  </Provider>
</body>

    </html>
  );
}
