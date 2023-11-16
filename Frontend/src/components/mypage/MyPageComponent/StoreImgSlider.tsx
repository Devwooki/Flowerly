import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import style from "./style/StoreImgSlider.module.css";

import { ImageInfo } from "@/recoil/memberInfoRecoil";
import { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

interface StoreImgSliderProps {
  imageInfos: ImageInfo[];
  onImageClick: (index: number) => void;
}

export default function StoreImgSlider({ imageInfos, onImageClick }: StoreImgSliderProps) {
  SwiperCore.use([Navigation, Scrollbar]);

  const swiperRef = useRef<HTMLDivElement>(null);
  const [imgSize, setImgSize] = useState<number>(0);

  useEffect(() => {
    if (swiperRef.current) {
      const imgBoxWidth = swiperRef.current.offsetWidth;
      setImgSize(imgBoxWidth / 3 - 10);
    }
  }, []);

  return (
    <>
      <div ref={swiperRef} className={style.imgSliderBox}>
        {imageInfos.length > 0 ? (
          <Swiper
            className={style.swiper}
            modules={[Navigation, Scrollbar, Pagination]}
            spaceBetween={0}
            slidesPerView={3}
            pagination={{ clickable: true, type: "bullets" }}
            scrollbar={{ draggable: true }}

            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {imageInfos.map((imageInfos, id) => (
              <SwiperSlide key={id} className={style.img}>
                <Image
                  src={imageInfos.imageUrl}
                  alt="store"
                  width={imgSize}
                  height={imgSize}
                  onClick={() => onImageClick(id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={style.swiper}>대표 이미지를 설정 해주세요!</div>
        )}
      </div>
    </>
  );
}
