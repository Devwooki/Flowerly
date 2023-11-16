import React from "react";
import style from "./SellerFllyListProgressCard.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { tokenHttp } from "@/api/chattingTokenHttp";
import { ToastSuccessMessage } from "@/model/toastMessageJHM";

interface Order {
  fllyId: number;
  orderName: string;
  orderType: string;
  deliveryPickupTime: string;
  progress: string;
  imageUrl: string;
}

interface SellerFllyListProgressCardProps {
  data: Order;
  updateHandler: (index: number, newProgress: string) => void;
  index: number;
}
const SellerFllyListProgressCard: React.FC<SellerFllyListProgressCardProps> = ({
  data,
  updateHandler,
  index,
}) => {
  const router = useRouter();
  const handleMoveToOrder = () => {
    router.push(`/flly/detail/${data.fllyId}`);
  };

  const handleFinish = () => {
    tokenHttp
      .patch(`/seller/flly/update/${data.fllyId}`)
      .then((res) => {
        if (res.data.code === 200) {
          // 수정필요
          console.log(res.data.data);
          updateHandler(index, res.data.data.fllyUpdateProgress);

          ToastSuccessMessage("플리가 완료되었습니다.");

          if (res.headers.authorization) {
            localStorage.setItem("accessToken", res.headers.authorization);
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
        }
      });
  };

  const handleMoveToFllyList = () => {
    router.push("/list");
  };

  return (
    <>
      <div className={style.cardBack}>
        <div className={style.cardHeader}>
          <div className={style.ImgBox} style={{ backgroundImage: `url('${data.imageUrl}')` }} />
          <div className={style.InfoBox}>
            <div className={style.OrderAddBox}>
              <div onClick={handleMoveToOrder}>
                주문서 보기 <span> &gt;</span>
              </div>
            </div>
            <div className={style.OrderInfoBox}>
              <div className={style.OrderInfoBoxHarf}>
                <div>주문자</div>
                <div>{data.orderName}</div>
              </div>
              <div className={style.OrderInfoBoxHarf}>
                <div>주문유형</div>
                <div>{data.orderType}</div>
              </div>
              <div className={style.OrderInfoBoxAll}>
                <div>배송완료 일시</div>
                <div>{data.deliveryPickupTime}</div>
              </div>
            </div>
            <div className={style.OrderFooter} onClick={handleMoveToFllyList}>
              <div>진행중 플리 이동</div>
            </div>
          </div>
        </div>
        <div className={style.cardFooter}>
          <div className={style.cardMainState}>
            <Image
              src="/img/icon/flower-bouquet.png"
              width={16}
              height={16}
              alt="상태이미지"
            ></Image>
            <span>{data.progress}</span>
          </div>
          <div className={style.cardFinshBtn} onClick={handleFinish}>
            완료하기
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerFllyListProgressCard;
