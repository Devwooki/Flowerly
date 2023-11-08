import Navi from "@/components/navi/Navi";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isChattingRoom = router.pathname.includes("/chatting/room/");

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (!accessToken) {
  //     router.push("/fllylogin");
  //   }
  //   if (accessToken) {
  //     router.push("/");
  //   }
  // }, [router]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("accessToken");
    if (!isLoggedIn) {
      // 로그인 상태가 아니라면, mypage로 리디렉션
      router.push("/fllylogin");
    }
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router]);
  return (
    <>
      <ToastContainer />
      <RecoilRoot>
        <ToastContainer position="top-center" />
        {isChattingRoom ? (
          <Component {...pageProps} />
        ) : (
          <>
            <Component {...pageProps} />
            <Navi />
          </>
        )}
      </RecoilRoot>
    </>
  );
}
