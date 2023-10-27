/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized: true,
    domains: ["localhost", "*"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
