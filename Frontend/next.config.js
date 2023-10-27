/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "akamai",
    path: "/",
  },
  // output: "export",
  // images: {
  //   loader: "imgix",
  //   path: "../../../public/navi/",
  // },
  reactStrictMode: true,
};

module.exports = nextConfig;
