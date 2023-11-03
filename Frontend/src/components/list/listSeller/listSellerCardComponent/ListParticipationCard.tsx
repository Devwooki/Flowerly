import React from "react";
import style from "./ListParticipationCard.module.css";
import Image from "next/image";

interface fllyResponeDtoType {
  fllyParticipationId: number;
  requestImageUrl: string;
  requestPrice: number;
  content: string;
}

interface participationType {
  fllyId: number;
  fllyImageUrl: string;
  fllyFlower1: string;
  fllyFlower2: string;
  fllyFlower3: string;
  fllybudget: number;
  fllyDeadline: string;
  fllyResponeDto: fllyResponeDtoType;
}

interface Props {
  $participationInfo: participationType;
}

const ListParticipationCard = ({ $participationInfo }: Props) => {
  return (
    <>
      <div className={style.cardBack}>
        <div className={style.requestBox}>
          <div className={style.imageBox}>
            <div style={{ backgroundImage: `url(${$participationInfo.fllyImageUrl})` }} />
          </div>
          <div className={style.cardInfoBox}>
            <div className={style.cardInfoBtn}>
              자세히보기<span>&gt;</span>
            </div>
            <div className={style.cardInfo}>
              <div>
                <Image src="/img/icon/seller-flower.png" width={20} height={20} alt="상태이미지" />
                <div>
                  {$participationInfo.fllyFlower1},{$participationInfo.fllyFlower2},{" "}
                  {$participationInfo.fllyFlower3}
                </div>
              </div>
              <div>
                <Image src="/img/icon/seller-money.png" width={20} height={20} alt="상태이미지" />
                <div>{$participationInfo.fllybudget} 원</div>
              </div>
              <div>
                <Image src="/img/icon/seller-time.png" width={20} height={20} alt="상태이미지" />
                <div>~ {$participationInfo.fllyDeadline}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.responseBox}>
          <div className={style.imageBox}>
            <div
              style={{
                backgroundImage: `url(${$participationInfo.fllyResponeDto.requestImageUrl})`,
              }}
            />
          </div>
          <div className={style.cardResponseBox}>
            <div>
              <div className={style.cardResponseInfo}>
                <Image src="/img/icon/seller-money.png" width={20} height={20} alt="상태이미지" />
                <div>{$participationInfo.fllyResponeDto.requestPrice} 원</div>
              </div>
              <div className={style.responseText}>{$participationInfo.fllyResponeDto.content}</div>
            </div>
          </div>
        </div>
        <div className={style.footerBox}>입찰중</div>
      </div>
    </>
  );
};

export default ListParticipationCard;
