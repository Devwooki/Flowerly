import React, { useEffect, useRef, useState } from "react";
import style from "./ShopList.module.css";
import ShopCard from "./ShopCard";
import { motion } from "framer-motion";
import { tokenHttp } from "@/api/chattingTokenHttp";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

type ShopListProps = {
  fllyId: number;
};

const ShopList = ({ fllyId }: ShopListProps) => {
  const { ref, inView } = useInView();
  const fetchshopList = async (pageParam: number) => {
    const res = await tokenHttp.get(`/buyer/flist-page/${fllyId}?page=${pageParam}`);

    return res.data.data.stores;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    "ShopListQuery",
    ({ pageParam = 0 }) => fetchshopList(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.last === true ? undefined : allPages.length;
      },
      retry: false,
    },
  );
  const isLastPage = data?.pages?.[data.pages.length - 1]?.last ?? false;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className={style.shopListMain}>
      {/* {shopList.length > 0 ? (
        shopList.map((shopInfo) => (
          <ShopCard
            shopInfo={shopInfo}
            key={shopInfo.participant.fllyParticipationId + shopInfo.storeInfoDto.storeInfoId}
          />
        ))
      ) : (
        <div>텅</div>
      )} */}
      {data?.pages?.map((page) =>
        page.content.map((shopInfo: storeContent) => (
          <ShopCard
            shopInfo={shopInfo}
            key={shopInfo.participant.fllyParticipationId + "-" + shopInfo.storeInfoDto.storeInfoId}
          />
        )),
      )}
      {isLastPage ? (
        <></>
      ) : isFetchingNextPage ? (
        <div>로딩중입니다...</div>
      ) : (
        <div ref={ref} style={{ height: "15px" }} />
      )}
    </div>
  );
};

export default ShopList;
