import { ToastErrorMessage } from "@/model/toastMessageJHM";
import axios from "axios";
import Router from "next/router";

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

  // console.log("토큰Http", accessToken);
  if (!accessToken) {
    console.log("token 이 존재하지 않습니다.");
    throw new Error("expire token");
  }

  //req.headers["Authorization"] = "Bearer " + accessToken;
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
      // Router.push("/fllylogin");
    } else {
      console.log(error);
    }
    // 에러를 반환하여 후속 .then() 또는 .catch()에서 처리할 수 있도록 합니다.
    return Promise.reject(error);
  },
);
