/** @type {import('next').NextConfig} */
const withExportImages = require("next-export-optimize-images"); // 추가

//추가 module.exports
module.exports = withExportImages({
  reactStrictMode: true,
  output: "export",
  // write your next.js configuration values.
});

//기존 module.exports
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;
