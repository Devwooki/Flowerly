import { ToastErrorMessage } from "@/model/toastMessageJHM";
import axios from "axios";

const baseURL = "https://flower-ly.co.kr/api";

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
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwOTU5NjYxOCwibWVtYmVySWQiOjJ9.ACc7GO0Th3g8vnT9iDfPEqiMqvvEXDVNMPF_x1ukk3oczXUilT2ctHXSoNvy-1Lp0-Jf4KQhyo-_FSj4CqlaHg";

  if (!accessToken) {
    console.log("token 이 존재하지 않습니다.");
    throw new Error("expire token");
  }

  req.headers["Authorization"] = "Bearer " + accessToken;
  return req;
});
