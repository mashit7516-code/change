/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "instagram.fxyz1-1.fna.fbcdn.net", // optional fallback host
      },
    ],
  },
};

export default nextConfig;
