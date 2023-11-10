/** @type {import('next').NextConfig} */
// import withExportImages from "next-export-optimize-images";

//const withExportImages = require("next-export-optimize-images");

//추가 module.exports
module.exports = {
  output: "standalone",
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    // ANOTHER_VARIABLE: process.env.ANOTHER_VARIABLE,
  },
  images: {
    domains: [
      "neighbrew.s3.ap-northeast-2.amazonaws.com",
      "localhost:3000",
      "oaidalleapiprodscus.blob.core.windows.net",
      "no1flower.godohosting.com",
    ],
  },
  // reactStrictMode: false,
};

//기존 module.exports
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;
