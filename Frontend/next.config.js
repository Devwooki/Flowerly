/** @type {import('next').NextConfig} */
// import withExportImages from "next-export-optimize-images";

//const withExportImages = require("next-export-optimize-images");

//추가 module.exports
module.exports = {
  output: "standalone",
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_API_ID: process.env.FIREBASE_API_ID,
    FIREBASE_MESUREMENT_ID: process.env.FIREBASE_MESUREMENT_ID,
    FIREBASE_VAPID: process.env.FIREBASE_VAPID,
    NEXT_PUBLIC_KAKAOMAP_KEY: process.env.NEXT_PUBLIC_KAKAOMAP_KEY,
    // ANOTHER_VARIABLE: process.env.ANOTHER_VARIABLE,
  },
  images: {
    domains: [
      "neighbrew.s3.ap-northeast-2.amazonaws.com",
      "localhost:3000",
      "oaidalleapiprodscus.blob.core.windows.net",
      "no1flower.godohosting.com",
      "dapi.kakao.com",
      "i.pinimg.com",
    ],
  },
  // reactStrictMode: false,
};

//기존 module.exports
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;
