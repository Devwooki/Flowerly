import Navi from "@/components/navi/Navi";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isChattingRoom = router.pathname.includes("/chatting/room/");
  const fllyLogin = router.pathname.includes("/fllylogin");
  const queryClient = new QueryClient();

  return (
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
  );
}
