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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/fllylogin");
    }
  });

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
