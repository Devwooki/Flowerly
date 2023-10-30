import Navi from "@/components/navi/Navi";
import "../styles/globals.css";
import style from "../styles/app.module.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Component {...pageProps} />
        <Navi />
      </RecoilRoot>
    </>
  );
}
