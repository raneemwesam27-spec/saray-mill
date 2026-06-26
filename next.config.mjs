/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
