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
  // const accessToken = localStorage.getItem("accessToken");
  const accessToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwOTU5MjMwNSwibWVtYmVySWQiOjJ9.ypu2VSWsTPJa9jN60g6SP79Z0kIjfDIRwgjXj6oOisTQiFE6AuZqeQLJ2juArzOEqbGx0opndXVoY7onC_KuDQ";

  console.log("토큰Http", accessToken);
  if (!accessToken) {
    console.log("token 이 존재하지 않습니다.");
    throw new Error("expire token");
  }

  req.headers["Authorization"] = "Bearer " + accessToken;
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
