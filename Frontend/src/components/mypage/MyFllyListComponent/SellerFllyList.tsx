import React, { useEffect, useState } from "react";
import SellerFllyListCompletedCard from "./SellerFllyListCard/SellerFllyListCompletedCard";
import SellerFllyListProgressCard from "./SellerFllyListCard/SellerFllyListProgressCard";
import { tokenHttp } from "@/api/tokenHttp";
import Router from "next/router";

export interface Order {
  fllyId: number;
  orderName: string;
  orderType: string;
  deliveryPickupTime: string;
  progress: string;
}

const SellerFllyList = () => {
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [progressOrders, setProgressOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getSellerFllyList = () => {
      tokenHttp
        .get("/mypage/seller/flly")
        .then((res) => {
          if (res.data.code === 200) {
            const orders: Order[] = res.data.data;

            const completed = orders.filter((order) => order.progress === "픽업/배달완료");
            const inProgress = orders.filter((order) => order.progress !== "픽업/배달완료");

            setCompletedOrders(completed);
            setProgressOrders(inProgress);

            if (res.headers.authorization) {
              localStorage.setItem("accessToken", res.headers.authorization);
            }
          }
        })
        .catch((err) => {
          if (err.res.status === 403) {
            Router.push("fllylogin");
          }
        });
    };
    getSellerFllyList();
  }, []);

  return (
    <>
      <div className="SellerFllyListBack">
        {completedOrders.map((order) => (
          <SellerFllyListCompletedCard key={order.fllyId} data={order} />
        ))}
        {progressOrders.map((order) => (
          <SellerFllyListProgressCard key={order.fllyId} data={order} />
        ))}
      </div>
    </>
  );
};

export default SellerFllyList;
