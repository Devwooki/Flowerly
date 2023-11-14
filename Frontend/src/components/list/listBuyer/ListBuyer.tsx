import React from "react";
import style from "./ListBuyer.module.css";
import BuyerCardOne from "./listBuyerCardComponent/BuyerCardOne";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import BuyerCards from "./listBuyerCardComponent/BuyerCards";
import { tokenHttp } from "@/api/tokenHttp";
import { useRouter } from "next/router";
import { ToastErrorMessage } from "@/model/toastMessageJHM";
import Image from "next/image";

const ListBuyer = () => {
  const router = useRouter();
  const { data, isLoading, isFetching, isError } = useQuery<BuyerCard[], AxiosError>(
    ["listBuyerQuery"],
    async () => {
      const res = await tokenHttp.get("/buyer/my-flly");
      console.log("플리스트", [res.data.data.content]);

      if (res.headers.authorization) {
        console.log("accessToken", res.headers.authorization);
        localStorage.setItem("accessToken", res.headers.authorization);
      }
      // return [res.data.data.content[1]];
      return res.data.data.content;
    },
    {
      onError: (error) => {
        console.log("에러 발생했다 임마");
        if (error?.response?.status === 403) {
          router.push("/fllylogin");
        }
      },
      retry: false,
      cacheTime: 0,
    },
  );

  return (
    <div className={style.ListBuyerBack}>
      <div className={style.ListBuyerHeader}>
        <div className={style.headerTitle}>진행중인 플리</div>
      </div>
      <div className={style.ListBuyerMain}>
        {data && data.length >= 2 ? (
          data.map((card) => <BuyerCards card={card} key={card.fllyId} />)
        ) : data && data.length === 1 ? (
          <BuyerCardOne card={data[0]} key={data[0].fllyId} />
        ) : (
          // 데이터가 없을 때
          <>
            <div className={style.noData}>
              <Image src="/img/etc/no-list-image.png" alt="플리" width={200} height={200} />
            </div>
            <div className={style.noDataText}>아직 생성된 플리가 없습니다.</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListBuyer;
