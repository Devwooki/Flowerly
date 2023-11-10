import { ToastErrorMessage } from "@/model/toastMessageJHM";
import axios from "axios";

// import { jwtDecode } from "jwt-decode";
// import dayjs from "dayjs";

// // 토큰이 필요한 인증에 사용
// const baseURL = "https://flower-ly.co.kr";

// const tokenHttp = axios.create({
//   baseURL,
//   headers: {
//     "Content-type": "application/json",
//   },
// });

// // 요청 인터셉터 설정 (요청 보내기 전에 수행되는 함수)
// tokenHttp.interceptors.request.use(async (req) => {
//   const accessToken = localStorage.getItem("accesstoken");
//   if (!accessToken) {
//     console.log("token 이 존재하지 않습니다.");
//     throw new Error("expire token");
//   }

//   const user = jwtDecode(accessToken);
//   const decodedToken = jwtDecode(accessToken!);
//   const exp = decodedToken.exp;
//   const now = dayjs().unix();

//   if (exp && now >= exp) {
//     await axios
//       .post(
//         `${baseURL}/user/refresh`,
//         {},
//         {
//           headers: {
//             Authorization: localStorage.getItem("refreshToken"),
//           },
//         },
//       )
//       .then((response) => {
//         if (response.data.code === 200) {
//           localStorage.setItem("accessToken", response.data["accessToken"]);
//           localStorage.setItem("refreshToken", response.data["refreshToken"]);
//         } else {
//           throw new Error("expire token");
//         }
//       })
//       .catch(() => {
//         throw new Error("expire token");
//       });
//   }

//   req.headers["Authorization"] = localStorage.getItem("accessToken");
//   return req;
// });

// export default tokenHttp;

// export const getTokenHttp = (
//   requestUrl: string,
//   successHandler: (response: any) => void,
//   failHandler: () => void,
// ) => {
//   const BaseUrl = "https://flower-ly.co.kr/api/";
//   const accessToken = localStorage.getItem("accessToken");
//   console.log("나 유알엘", requestUrl);
//   axios
//     .get(BaseUrl + requestUrl, {
//       headers: {
//         Authorization: "Bearer " + accessToken,
//         withCredential: false,
//       },
//     })
//     .then((response) => {
//       console.log("나 리스펀스", response);
//       if (response.data.code === 200) {
//         console.log("나 성공", response.data);
//         successHandler(response.data);
//       }
//       if (response.data.code === 401) {
//         axios
//           .get(BaseUrl + requestUrl, {
//             headers: {
//               withCredential: true,
//             },
//           })
//           .then((response) => {
//             if (response.data.code === 200) {
//               successHandler(response.data);
//             }
//             //리프레시 포함
//             else if (response.data.code === 403) {
//               ToastErrorMessage("로그인이 만료되었습니다. 다시 로그인해주세요");
//               localStorage.removeItem("accessToken");
//               failHandler();
//               // router.push("/fllylogin");
//             }
//           })
//           .catch((error) => {
//             console.log(error);
//             ToastErrorMessage("서버 에러 발생!! 초비상!!!");
//           });
//       }
//       if (response.data.code === 403) {
//         //리프레시 포함
//         ToastErrorMessage("로그인이 만료되었습니다. 다시 로그인해주세요");
//         localStorage.removeItem("accessToken");
//         failHandler();
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       ToastErrorMessage("서버 에러 발생!! 초비상!!!");
//     });
// };

const baseURL = "https://flower-ly.co.kr/api";

export const tokenHttp = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

tokenHttp.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem("accesstoken");

  if (!accessToken) {
    console.log("token 이 존재하지 않습니다.");
    throw new Error("expire token");
  }

  req.headers["Authorization"] = accessToken;
  return req;
});
