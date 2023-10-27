/** @type {import('next').NextConfig} */
const withExportImages = require("next-export-optimize-images");

module.exports = withExportImages({
  output: "export",
  // write your next.js configuration values.
});

// const nextConfig = {
//   // images: {
//   //   loader: "default",
//   // },
//   // output: "export",
//   // images: {
//   //   loader: "imgix",
//   //   path: "../../../public/navi/",
//   // },
//   reactStrictMode: true,
// };

// module.exports = nextConfig;
