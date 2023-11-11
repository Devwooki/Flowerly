import style from "./Home.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

// import required modules
import { EffectCreative } from "swiper/modules";

export default function Home() {
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
    {
      id: 4,
      imgSrc:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
      alt: "천일홍",
      date: "7월 ~ 12월",
      desc: "분홍색 천일홍",
      message: "우아함, 달콤함, 치절, 애정",
    },
    {
      id: 5,
      imgSrc:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
      alt: "천일홍",
      date: "7월 ~ 12월",
      desc: "분홍색 천일홍",
      message: "우아함, 달콤함, 치절, 애정",
    },
    {
      id: 6,
      imgSrc:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
      alt: "천일홍",
      date: "7월 ~ 12월",
      desc: "분홍색 천일홍",
      message: "우아함, 달콤함, 치절, 애정",
    },
    {
      id: 7,
      imgSrc:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
      alt: "천일홍",
      date: "7월 ~ 12월",
      desc: "분홍색 천일홍",
      message: "우아함, 달콤함, 치절, 애정",
    },
    {
      id: 8,
      imgSrc:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
      alt: "천일홍",
      date: "7월 ~ 12월",
      desc: "분홍색 천일홍",
      message: "우아함, 달콤함, 치절, 애정",
    },
    {
      id: 9,
      imgSrc:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
      alt: "천일홍",
      date: "7월 ~ 12월",
      desc: "분홍색 천일홍",
      message: "우아함, 달콤함, 치절, 애정",
    },
  ];

  return (
    <>
      <div className={style.home}>
        <div className={style.mainHeader}>
          <div className={style.header}>플리로고</div>
          <div className={style.title}>플리가 추천하는</div>
          <div className={style.title}>가을의 꽃을 만나보세요</div>
        </div>
        <Swiper
          direction={"vertical"}
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -200],
            },
            next: {
              translate: [0, "100%", 0],
            },
          }}
          modules={[EffectCreative]}
          className={style.mainBody}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id} className={`${style.bannerImg}`}>
              <div className={`${style.imgDiv}`}>
                <Image src={card.imgSrc} alt={card.alt} fill className={`${style.imgContent}`} />
              </div>
              <div className={style.imgDisc}>
                <div>{card.date}</div>
                <div>{card.desc}</div>
                <div className={style.divider}></div>
                <div>{card.message}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
