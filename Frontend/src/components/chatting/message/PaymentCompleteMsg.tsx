import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import style from "./style/PaymentCompleteMsg.module.css";
import { tokenHttp } from "@/api/tokenHttp";

type PaymentInfo = {
  requestId: number;
  sellerId: number;
  sellerName: string;
  price: number;
  isPaid: boolean;
};

type PaymentMsgProps = {
  chattingId: number;
};

const PaymentCompleteMsg: React.FC<PaymentMsgProps> = ({ chattingId }) => {
  const router = useRouter();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();

  useEffect(() => {
    tokenHttp
      .get(`/chatting/price/${chattingId}`)
      .then((response) => {
        if (response.data.code === 200) {
          setPaymentInfo(response.data.data);
          //요거 필수!! (엑세스 토큰 만료로 재발급 받았다면 바꿔줘!! )
          if (response.headers.authorization) {
            localStorage.setItem("accessToken", response.headers.authorization);
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
        }
      });
  }, []);

  return (
    <>
      <div className={style.mainBox}>
        <div className={style.title}>결제가 완료되었습니다.</div>
        <div className={style.infoDiv}>
          <div className={style.divideDiv}></div>
          <div className={style.priceDiv}>
            <div>결제 금액</div>
            <div>{paymentInfo?.price.toLocaleString()} 원</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCompleteMsg;
