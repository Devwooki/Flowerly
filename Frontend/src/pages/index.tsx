import style from "@styles/Home.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여지는 카드의 인덱스

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const cards = [
    {
      id: 1,
      imgSrc:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/9ab5e8bb-56f9-4cff-967b-22075b73e37a010_pink_gookhwa.jpg.jpg",
      alt: "호접란",
      date: "11월 ~ 3월",
      desc: "빨간색 호접란",
      message: "강렬한 사랑과 매력",
    },
    {
      id: 2,
      imgSrc:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/da3f0e9f-0c1e-45d8-ba34-86e57331687b011_yellow_gookhwa.jpg.jpg",
      alt: "글라디올러스",
      date: "5월 ~ 11월",
      desc: "보라색 글라디올러스",
      message: "우아함, 고귀함, 아름다움",
    },
    {
      id: 3,
      imgSrc:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
      alt: "천일홍",
      date: "7월 ~ 12월",
      desc: "분홍색 천일홍",
      message: "우아함, 달콤함, 치절, 애정",
    },
  ];

  const emojiVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className={style.home}>
        <div className={style.mainHeader}>
          <div className={style.header}>플리로고</div>
          <div className={style.title}>플리가 추천하는</div>
          <div className={style.title}>가을의 꽃을 만나보세요</div>
        </div>
        <motion.div
          className={style.mainBody}
          ref={ref}
          style={{ scale: scaleProgess, opacity: opacityProgess }}
        >
          {cards.map((card) => (
            <motion.div key={card.id} className={`${style.bannerImg}`}>
              <div className={`${style.imgDiv}`}>
                <Image src={card.imgSrc} alt={card.alt} fill />
              </div>
              <div className={style.imgDisc}>
                <div>{card.date}</div>
                <div>{card.desc}</div>
                <div className={style.divider}></div>
                <div>{card.message}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
