import Navi from "@/components/navi/Navi";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";

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
        <meta property="og:title" content="특별한 날, 특별한 선물을 해보세요" />
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
