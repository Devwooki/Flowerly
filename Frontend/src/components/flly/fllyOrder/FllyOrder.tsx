import React, { useEffect, useState } from "react";
import style from "./style/FllyOrder.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import FllyInfoBox from "./fllyOrderComponent/FllyInfoBox";
import OrderInfoBox from "./fllyOrderComponent/OrderInfoBox";
import ShippingInfoBox from "./fllyOrderComponent/ShippingInfoBox";
import PaymentInfoBox from "./fllyOrderComponent/PaymentInfoBox";
import { useParams } from "next/navigation";
import { tokenHttp } from "@/api/tokenHttp";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

interface flowerType {
  flowerName: string;
  meaning: string;
}

interface resultSimpleType {
  fllyId: number;
  requestImgUrl: string | null;
  situation: string | null;
  target: string | null;
  color1: string | null;
  color2: string | null;
  color3: string | null;
  flower1: flowerType;
  flower2: flowerType;
  flower3: flowerType;
}

interface orderInfoType {
  requestId: number;
  orderName: string;
  phoneNumber: string;
  orderType: string;
  deliveryPickupTime: string;
  fllyId: number;
  progress: string;
  responseImgUrl: string | null;
  responseContent: string;
  price: number;
  createTime: string;
}

interface deliveryInfoType {
  recipientName: string;
  phoneNumber: string;
  address: string;
}

const FllyOrder = () => {
  const router = useRouter();
  const fllyId = useParams();
  const [requestInfo, setRequestInfo] = useState<resultSimpleType>();
  const [orderInfo, setOrderInfo] = useState<orderInfoType>();
  const [deliverInfo, setDeliverInfo] = useState<deliveryInfoType>();
  //나중에 바뀔거
  const [memberType, setMemberType] = useState<string>("seller");

  useEffect(() => {
    tokenHttp
      .get(`/seller/flly/order/` + fllyId.fllyId)
      .then((res) => {
        console.log(res);
        const rData = res.data;
        if (rData.code === 200) {
          setRequestInfo(rData.data.reqestInfo);
          setOrderInfo(rData.data.orderInfo);
          setDeliverInfo(rData.data.deliverInfo);
        }
        localStorage.setItem("accessToken", res.headers.authorization);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
          ToastErrorMessage("로그인 만료되어 로그인화면으로 이동합니다.");
        }
      });
  }, []);

  return (
    <>
      <div className={style.orderBox}>
        <div className={style.orderHeader}>
          <Image
            src="/img/btn/left-btn.png"
            alt="뒤로가기"
            width={13}
            height={20}
            onClick={() => {
              router.back();
            }}
          />

          <div className={style.headerTitle}>플리 주문서</div>
        </div>
        <div className={style.infoBox}>
          {requestInfo && (
            <div className={style.fllyInfoBox}>
              <FllyInfoBox
                $requestInfo={requestInfo}
                $imgUrl={
                  memberType === "seller" ? requestInfo.requestImgUrl : orderInfo?.responseImgUrl
                }
              />
            </div>
          )}
          {orderInfo && (
            <>
              <div className={style.oderInfoBox}>
                <OrderInfoBox $orderInfo={orderInfo} />
              </div>
              {orderInfo?.orderType === "배달" && deliverInfo && (
                <div className={style.shippingInfoBox}>
                  <ShippingInfoBox $deliveryInfo={deliverInfo} />
                </div>
              )}
              <div className={style.paymentInfoBox}>
                <PaymentInfoBox $orderPrice={orderInfo.price} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FllyOrder;
