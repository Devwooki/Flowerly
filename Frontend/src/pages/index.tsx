import style from "@styles/Home.module.css";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [cardOrder, setCardOrder] = useState([0, 1, 2]);

  const f1 =
    "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/9ab5e8bb-56f9-4cff-967b-22075b73e37a010_pink_gookhwa.jpg.jpg";

  const f2 =
    "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/da3f0e9f-0c1e-45d8-ba34-86e57331687b011_yellow_gookhwa.jpg.jpg";

  const f3 =
    "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg";
  const cards = [
    {
      id: 1,
      src: "/img/homeBanner/164_red_phalaenopsis.jpg",
      alt: "호접란",
      date: "11월 ~ 3월",
      desc: "빨간색 호접란",
      message: "강렬한 사랑과 매력",
    },
    {
      id: 2,
      src: "/img/homeBanner/test.webp",
      alt: "글라디올러스",
      date: "5월 ~ 11월",
      desc: "보라색 글라디올러스",
      message: "우아함, 고귀함, 아름다움",
    },
    {
      id: 3,
      src: "/img/homeBanner/121_pink_gomphrena.jpg",
      alt: "천일홍",
      date: "7월 ~ 12월",
      desc: "분홍색 천일홍",
      message: "우아함, 달콤함, 치절, 애정",
    },
  ];

  const handleUpClick = () => {
    setCardOrder([cardOrder[2], cardOrder[0], cardOrder[1]]);
  };

  const handleDownClick = () => {
    setCardOrder([cardOrder[1], cardOrder[2], cardOrder[0]]);
  };

  return (
    <>
      <div className={style.home}>
        <div className={style.mainHeader}>
          <div className={style.header}>플리로고</div>
          <div className={style.title}>플리가 추천하는</div>
          <div className={style.title}>가을의 꽃을 만나보세요</div>
        </div>
        <div className={style.mainBody}>
          {cardOrder.map((order, index) => {
            const card = cards[order];
            return (
              <div key={card.id} className={`${style.bannerImg} ${style[`card${index + 1}`]} `}>
                <Image src={card.src} alt={card.alt} fill priority />
                <div className={style.imgDisc}>
                  <div>{card.date}</div>
                  <div>{card.desc}</div>
                  <div className={style.divider}></div>
                  <div>{card.message}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.btnPakage}>
          <div onClick={handleDownClick}>
            <span className="arrow">이전</span>
          </div>
          <div onClick={handleUpClick}>
            <span className="arrow">다음</span>
          </div>
        </div>
        <Image src={f1} alt="150" width={100} height={100} />
        <Image src={f2} alt="150" width={100} height={100} />
        <Image src={f3} alt="150" width={100} height={100} />
      </div>
    </>
  );
}
