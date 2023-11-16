import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import style from "./style/StoreImgSlider.module.css";

export default function StoreImgSlider({
  imageUrls,
  onImageClick,
}: {
  imageUrls: string[];
  onImageClick: (index: number) => void;
}) {
  SwiperCore.use([Navigation, Scrollbar]);

  return (
    <>
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
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index} className={style.img}>
            <Image
              src={url}
              alt="store"
              width={100}
              height={100}
              onClick={() => onImageClick(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
