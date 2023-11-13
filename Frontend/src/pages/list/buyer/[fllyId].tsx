import style from "./fllyId.module.css";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { tokenHttp } from "@/api/tokenHttp";
import Disc from "@/components/list/listBuyer/fllylistComponent/Disc";
import ShopList from "@/components/list/listBuyer/fllylistComponent/ShopList";

const FllyList = () => {
  const param = useParams();

  const { data, isLoading, isFetching, isError } = useQuery<fllyList, AxiosError>(
    ["FllyListQuery"],
    async () => {
      const res = await tokenHttp.get(`/buyer/flist/${param.fllyId}`);
      console.log("res", res);

      if (res.headers.authorization) {
        console.log("accessToken", res.headers.authorization);
        localStorage.setItem("accessToken", res.headers.authorization);
      }
      return res.data.data;
    },
    {
      onError: (error) => {
        console.log("에러 발생했다 임마");
        console.log(error?.response?.status);
      },
      retry: 2,
      cacheTime: 0,
    },
  );

  if (isLoading) {
    <div>로딩중</div>;
  }
  if (isFetching) {
    <div>로딩중</div>;
  }
  if (isError) {
    <div>에러났다 임마</div>;
  }

  return (
    <motion.div className={style.ListBuyerBack}>
      <div className={style.ListBuyerHeader}>
        <div className={style.headerTitle}>플리스트</div>
      </div>
      <div className={style.ListBuyerMain}>
        {data && (
          <div className={style.fllyListMain}>
            <Disc card={data.flly} />
            <ShopList shopList={data.stores.content} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FllyList;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // context.params를 통해 URL 파라미터에 접근할 수 있습니다.
  const { fllyId } = context.params;

  console.log("SSR 렌더링", fllyId);
  // 필요한 데이터를 props로 페이지에 전달할 수 있습니다.
  return {
    props: { fllyId },
  };
};
