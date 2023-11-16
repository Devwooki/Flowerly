import React, { useEffect, useState } from "react";
import SellerFllyListCompletedCard from "./SellerFllyListCard/SellerFllyListCompletedCard";
import SellerFllyListProgressCard from "./SellerFllyListCard/SellerFllyListProgressCard";
import { tokenHttp } from "@/api/tokenHttp";
import { useRouter } from "next/router";
import EmptySellerFllyList from "@/components/emptypage/EmptySellerFllyList";
import style from "./style/SellerFllyList.module.css";

export interface Order {
  fllyId: number;
  orderName: string;
  orderType: string;
  deliveryPickupTime: string;
  progress: string;
  imageUrl: string;
  createdAt: string;
}

const SellerFllyList = () => {
  const router = useRouter();

  const [sellerFllyList, setSellerFllyList] = useState<Order[]>([]);

  const updateHandler = (index: number, newProgress: string) => {
    const updateSellerFllyList = [...sellerFllyList];
    updateSellerFllyList[index].progress = newProgress;
    setSellerFllyList(updateSellerFllyList);
  };

  useEffect(() => {
    const getSellerFllyList = () => {
      tokenHttp
        .get("/mypage/seller/flly")
        .then((res) => {
          if (res.data.code === 200) {
            // 정렬
            const sortedData = res.data.data.sort(
              (a: Order, b: Order) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            );

            setSellerFllyList(sortedData);
            if (res.headers.authorization) {
              localStorage.setItem("accessToken", res.headers.authorization);
            }
          }
        })
        .catch((err) => {
          if (err.res.status === 403) {
            router.push("fllylogin");
          }
        });
    };
    getSellerFllyList();
  }, []);

  return (
    <>
      <div className="SellerFllyListBack">
        {sellerFllyList.length > 0 ? (
          sellerFllyList.map((order, index) =>
            order.progress === "픽업/배달완료" ? (
              <SellerFllyListCompletedCard key={order.fllyId + order.orderName} data={order} />
            ) : (
              <SellerFllyListProgressCard
                key={order.fllyId + order.orderName}
                data={order}
                updateHandler={updateHandler}
                index={index}
              />
            ),
          )
        ) : (
          <div className={style.emptyBack}>
            <EmptySellerFllyList />
          </div>
        )}
      </div>
    </>
  );
};

export default SellerFllyList;