import { ToastErrorMessage } from "@/model/toastMessageJHM";
import axios from "axios";

const baseURL = "https://flower-ly.co.kr/api";
//const baseURL = "http://localhost:6090/api";

export const tokenHttp = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

tokenHttp.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem("accessToken");
  // const accessToken =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODY4MzQ4NiwibWVtYmVySWQiOjF9.wU3IYYWErRie5E5s7oIRYMliboyumfMrCZILaKnwlxXxJXCW1kHZ5fJ-mKvsAwYuMV4-UT0F4qoUX9rVcrTiNw"; // 1번
  // const accessToken =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODc1MjUwMywibWVtYmVySWQiOjJ9.o_v_EVuucqlh2NPfHioqquPjm3U-JTP-7ZP2xJkxIxMsPBMhxnw0DL-Avnh2ryBa_J6JYS7YdCc5dZuMS_9IUw"; // 2번

  // console.log("토큰Http", accessToken);
  if (!accessToken) {
    console.log("token 이 존재하지 않습니다.");
    throw new Error("expire token");
  }

  req.headers["Authorization"] = accessToken;
  return req;
});

tokenHttp.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      // 토큰 만료된 경우 처리를 합니다.
      ToastErrorMessage("로그인 만료되어 로그인 화면으로 이동합니다.");
      localStorage.removeItem("accessToken");
    } else {
      console.log(error);
    }
    // 에러를 반환하여 후속 .then() 또는 .catch()에서 처리할 수 있도록 합니다.
    return Promise.reject(error);
  },
);
