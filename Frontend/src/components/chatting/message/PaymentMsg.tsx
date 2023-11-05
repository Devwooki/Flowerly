import { useState, useEffect } from "react";
import style from "./PaymentMsg.module.css";
import Image from "next/image";
import axios from "axios";

type PaymentInfo = {
  requestId: number;
  sellerName: string;
  price: number;
};

type PaymentMsgProps = {
  chattingId: number;
};

const PaymentMsg: React.FC<PaymentMsgProps> = ({ chattingId }) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();

  useEffect(() => {
    // axios.get(`https://flower-ly.co.kr/api/chatting/price/${chattingId}`).then((response) => {
    //   console.log(response);
    //   setPaymentInfo(response.data.data);
    // });
    setPaymentInfo({
      requestId: 1,
      sellerName: "아름다운 꽃집",
      price: 30000,
    });
  }, []);

  return (
    <>
      <div className={style.mainBox}>
        <div className={style.title}>결제를 요청하였습니다.</div>
        <div className={style.infoDiv}>
          <div className={style.sellerDiv}>{paymentInfo?.sellerName}</div>
          <div className={style.priceDiv}>
            <div>금액</div>
            <div>{paymentInfo?.price.toLocaleString()} 원</div>
          </div>
          <div className={style.btnDiv}>
            <Image src="/img/btn/kakao-pay-btn.png" width={80} height={30} alt="카카오페이" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMsg;
