import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

// 토큰이 필요한 인증에 사용
const baseURL = "https://flower-ly.co.kr";

const tokenHttp = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

// 요청 인터셉터 설정 (요청 보내기 전에 수행되는 함수)
tokenHttp.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem("accesstoken");
  if (!accessToken) {
    console.log("token 이 존재하지 않습니다.");
    throw new Error("expire token");
  }

  const user = jwtDecode(accessToken);
  const decodedToken = jwtDecode(accessToken!);
  const exp = decodedToken.exp;
  const now = dayjs().unix();

  if (exp && now >= exp) {
    await axios
      .post(
        `${baseURL}/user/refresh`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("refreshToken"),
          },
        },
      )
      .then((response) => {
        if (response.data.message === "success") {
          localStorage.setItem("accessToken", response.data["accessToken"]);
          localStorage.setItem("refreshToken", response.data["refreshToken"]);
        } else {
          throw new Error("expire token");
        }
      })
      .catch(() => {
        throw new Error("expire token");
      });
  }

  req.headers["Authorization"] = localStorage.getItem("accessToken");
  return req;
});

export default tokenHttp;
