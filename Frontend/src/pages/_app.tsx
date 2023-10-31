import Navi from "@/components/navi/Navi";
import "../styles/globals.css";
import style from "../styles/app.module.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isChattingRoom = router.pathname.includes("/chatting/room/");

  return (
    <>
      <RecoilRoot>
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
