import React, { useEffect, useState } from "react";
import style from "./ListAdoptCard.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

interface adoptType {
  requestId: number;
  orderName: string;
  phoneNumber: string;
  orderType: string;
  deliveryPickupTime: string;
  fllyId: number;
  progress: string;
  imageUrl: string;
}

interface Props {
  ModalChangeHandler: () => void;
  $adoptInfo: adoptType;
  SelectIdChangeHandler: (fllyId: number, index: number) => void;
  $index: number;
}

const ListAdoptCard = ({
  ModalChangeHandler,
  SelectIdChangeHandler,
  $adoptInfo,
  $index,
}: Props) => {
  const flowerSrc = "/img/icon/flower-bouquet.png";
  const paperSrc = "/img/icon/paper-plane.png";

  const btnClickHandler = () => {
    SelectIdChangeHandler($adoptInfo.fllyId, $index);
    ModalChangeHandler();
  };

  const [progressState, setProgressState] = useState<string>();
  const [progressImg, setProgressImg] = useState<string>("/img/icon/flower-bouquet.png");
  const router = useRouter();

  useEffect(() => {
    console.log($adoptInfo.fllyId);
    if ($adoptInfo.progress === "주문완료") {
      setProgressState("제작중");
      setProgressImg(flowerSrc);
    }
    if ($adoptInfo.progress === "제작완료") {
      setProgressState("배송중");
      setProgressImg(paperSrc);
    }
  }, [$adoptInfo.progress]);

  const pageMoveHandelr = () => {
    if ($adoptInfo) {
      router.push(
        {
          pathname: "/flly/order/sheet/[fllyId]",
          query: { fllyId: $adoptInfo.fllyId },
        },
        "/flly/order/sheet", // 이것은 브라우저 주소창에 표시될 URL입니다.
        { shallow: true },
      );
    } else {
      ToastErrorMessage("잠시후 다시 눌러주세요!");
    }
  };

  return (
    <>
      {$adoptInfo.progress !== "픽업/배달완료" ? (
        <div className={style.cardBack}>
          <div className={style.cardHeader}>
            <div className={style.cardHeaderImg}>
              <div style={{ backgroundImage: `url(${$adoptInfo.imageUrl})` }} />
            </div>
            <div className={style.cardHeaderInfoBox}>
              <div className={style.cardHeaderInfo}>
                <div>
                  <Image src="/img/icon/seller-user.png" width={18} height={18} alt="상태이미지" />
                  <div>{$adoptInfo.orderName}</div>
                </div>
                <div>
                  <Image src="/img/icon/seller-phon.png" width={18} height={18} alt="상태이미지" />
                  <div>{$adoptInfo.phoneNumber}</div>
                </div>
                <div>
                  <Image
                    src="/img/icon/seller-forward.png"
                    width={18}
                    height={18}
                    alt="상태이미지"
                  />
                  <div>{$adoptInfo.orderType}</div>
                </div>
                <div>
                  <Image src="/img/icon/seller-time.png" width={18} height={18} alt="상태이미지" />
                  <div>{$adoptInfo.deliveryPickupTime}</div>
                </div>
              </div>
              <div>
                <div className={style.moveBtnBox} onClick={pageMoveHandelr}>
                  주문서 보기<span> &gt;</span>
                </div>
              </div>
            </div>
          </div>
          <div className={style.cardMain}>
            <div className={style.cardMainState}>
              <Image src={progressImg} width={16} height={16} alt="상태이미지"></Image>
              <span>{progressState}</span>
            </div>
            <div className={style.cardFinshBtn} onClick={btnClickHandler}>
              완료하기
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ListAdoptCard;
