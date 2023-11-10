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
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwOTU5MjMwNSwibWVtYmVySWQiOjJ9.ypu2VSWsTPJa9jN60g6SP79Z0kIjfDIRwgjXj6oOisTQiFE6AuZqeQLJ2juArzOEqbGx0opndXVoY7onC_KuDQ";

  console.log("토큰Http", accessToken);
  if (!accessToken) {
    console.log("token 이 존재하지 않습니다.");
    throw new Error("expire token");
  }

  req.headers["Authorization"] = "Bearer " + accessToken;
  return req;
});
