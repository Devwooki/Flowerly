import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // 이렇게 해야 서로 다른 사용자와 요청 사이에 데이터가 공유되지 않는다.
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {/* <GlobalStyle /> */}
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
