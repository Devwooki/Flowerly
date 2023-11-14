import style from "./Home.module.css";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
// import required modules
import { EffectCreative } from "swiper/modules";
import { useEffect, useState } from "react";
import { tokenHttp } from "@/api/tokenHttp";
import { ToastErrorMessage } from "@/model/toastMessageJHM";
import { useRouter } from "next/router";
import Head from "next/head";

interface cardResponse {
  flowerCode: number;
  flowerName: string;
  imageUrl: string;
  meaning: string;
  period: string;
}

interface card {
  id: number;
  desc: string;
  imgSrc: string;
  message: string;
  date: string;
  alt: string;
}

export default function Home() {
  const [cards, setCards] = useState([] as card[]);
  const router = useRouter();
  const today = new Date();
  console.log(today.getMonth() + 1);

  const axiosHandler = () => {
    tokenHttp
      .get(`/main`)
      .then((response) => {
        // console.log(response);
        // console.log(response.data);
        if (response.data.code === 200) {
          const temp = [] as card[];
          response.data.data.map((item: cardResponse) => {
            const newObj = {
              id: item.flowerCode,
              desc: item.flowerName,
              imgSrc: item.imageUrl,
              message: item.meaning,
              date: item.period,
              alt: item.flowerName,
            };

            temp.push(newObj);
          });
          setCards(temp);
          if (response.headers.authorization)
            localStorage.setItem("accessToken", response.headers.authorization);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          router.push("/fllylogin");
        } else ToastErrorMessage("오류가 발생했습니다.");
      });
  };

  useEffect(() => {
    axiosHandler();
  }, []);

  return (
    <>
      <Head>
        <title>{`${today.getMonth() + 1}월의 꽃을 만나보세요`} </title>
        <meta property="og:image" content={"/img/homeBanner/121_pink_gomphrena.jpg"} />
        <meta property="og:title" content={`${today.getMonth() + 1}월의 꽃을 만나보세요`} />
      </Head>
      <div className={style.home}>
        <div className={style.mainHeader}>
          <div className={style.header}>플리로고</div>
          <div className={style.title}>플리가 추천하는</div>
          <div className={style.title}>가을의 꽃을 만나보세요</div>
        </div>
        <Swiper
          loop={true}
          direction={"vertical"}
          grabCursor={true}
          // spaceBetween={40}
          slidesPerView={1.2}
          effect={"creative"}
          speed={800}
          creativeEffect={{
            prev: {
              // shadow: true,
              translate: [0, "20%", -200],
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
