import React, { useEffect, useState } from "react";
import style from "./Disc.module.css";
import Image from "next/image";

type DiscProps = {
  card: BuyerCard;
};

const Disc = ({ card }: DiscProps) => {
  console.log(card.requestAddress);

  const [moreBtn, setMoreBtn] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedFlower, setSelectedFlower] = useState<flower[]>([]);

  const handlerMoreBtn = () => {
    setMoreBtn((pre) => !pre);
    console.log(moreBtn);
  };

  useEffect(() => {
    setSelectedColor([card.color1, card.color2, card.color3].filter((flower) => flower !== null)),
      setSelectedFlower(
        [card.flower1, card.flower2, card.flower3].filter((flower) => flower !== null),
      );
  }, [card]);

  return (
    <div className={style.discMain}>
      <div className={style.discMainShortUp}>
        <Image src={card.imageUrl} alt="시안 이미지" width={120} height={120} />
        <div className={style.discText}>
          <div className={style.discTable}>
            <div>예산</div>
            <div>{card.budget}</div>
          </div>
          <div className={style.discTable}>
            <div>마감</div>
            <div>~ {card.deadline}</div>
          </div>
        </div>
      </div>
      {!moreBtn && (
        <div className={style.detailPlus} onClick={() => handlerMoreBtn()}>
          상세 보기
        </div>
      )}
      {moreBtn && (
        <>
          <div className={` ${style.discTextPlus} ${moreBtn ? style.open : ""}`}>
            <div className={style.divider} />
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>의뢰인</div>
              <div className={style.detailContent}>{card.consumer}</div>
            </div>
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>상황</div>
              <div className={style.detailContent}>{card.situation || "선택안함"}</div>
            </div>
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>대상</div>
              <div className={style.detailContent}>{card.target || "선택안함"}</div>
            </div>
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>색상</div>
              {selectedColor.length > 0
                ? selectedColor.map((color, idx) => (
                    <div className={style.detailContent} key={idx}>
                      {idx > 0 && <span>&nbsp;</span>}
                      {color}
                    </div>
                  ))
                : "선택안함"}
            </div>
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>선택한 꽃</div>
              <div className={style.detailContent}>
                {selectedFlower.length > 0
                  ? selectedFlower.map(
                      (flower, idx) => flower && <div key={idx}>{flower.flowerName}</div>,
                    )
                  : "선택안함"}
              </div>
            </div>
            <div className={style.divider} />
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>주문유형</div>
              <div className={style.detailContent}>{card.orderType}</div>
            </div>
            {card.orderType === "배달" ? (
              <div className={style.discDetailTable}>
                <div className={style.detailTitle}>주소</div>
                <div className={style.detailContent}>{card.requestAddress}</div>
              </div>
            ) : (
              <></>
            )}
            <div className={style.discDetailTable} style={{ display: "inline-block" }}>
              <div className={style.detailTitle}>요청사항</div>
              <div className={`${style.detailContent} ${style.requestContent}`}>
                {card.requestContent}
              </div>
            </div>
          </div>
          <div className={style.detailMius} onClick={() => handlerMoreBtn()}>
            접기
          </div>
        </>
      )}
    </div>
  );
};

export default Disc;
