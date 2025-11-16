import { Geist, Geist_Mono } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

      <body className={`${poppins.variable} text-[#ffffff]  bg-[#008f00]    font-sans relative min-h-screen`}>
        <Provider>
      
        <div className="fixed inset-0 -z-10">
          <Silk
            speed={20}
            scale={1}
            color="#059e00"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
        <NavBAr />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Footer />
        </Provider>
      </body>
    </html>
  );
}

