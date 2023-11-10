import React, { useState, useEffect } from "react";
import style from "./ListBuyer.module.css";
import BuyerCardOne from "./listBuyerCardComponent/BuyerCardOne";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { KDMaxios } from "@/api/basicHttp";
import BuyerCards from "./listBuyerCardComponent/BuyerCards";

const ListBuyer = () => {
  const { data, isLoading, isFetching, isError } = useQuery<BuyerCard[], AxiosError>(
    ["listBuyerQuery"],
    async () => {
      const res = await KDMaxios.get("api/buyer/my-flly", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });
      console.log(res.data.data.content);

      return res.data.data.content;
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
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className={style.ListBuyerBack}>
      <div className={style.ListBuyerHeader}>
        <div className={style.headerTitle}>진행중인 플리</div>
      </div>
      <div className={style.ListBuyerMain}>
        {data && data.length === 1 ? (
          <BuyerCardOne card={data[0]} key={data[0].fllyId} />
        ) : (
          data && data.map((card) => <BuyerCards card={card} key={card.fllyId} />)
        )}
      </div>
    </div>
  );
};

export default ListBuyer;
