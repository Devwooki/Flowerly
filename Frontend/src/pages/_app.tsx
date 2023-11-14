import Navi from "@/components/navi/Navi";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isChattingRoom = router.pathname.includes("/chatting/room/");
  const fllyLogin = router.pathname.includes("/fllylogin");
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <link type="image" rel="icon" href="/test/vertical.jpg" />
        <title>플리의 특별한 선물</title>
        <meta property="og:image" content={"/test/test-flower-img.png"} />
        <meta property="og:url" content={"/test/test-flower-img.png"} />
        <meta property="og:title" content="플리 - 세상에 하나뿐인 꽃다발" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RecoilRoot>
          {isChattingRoom || fllyLogin ? (
            <Component {...pageProps} />
          ) : (
            <>
              <Component {...pageProps} />
              <Navi />
            </>
          )}
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
