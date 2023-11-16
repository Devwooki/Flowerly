import React, { useEffect, useRef, useState } from "react";
import style from "./style/MypageStoreImg.module.css";
import Image from "next/image";
import StoreImgModal from "../StoreImgComponent/StoreImgModal";
import StoreImgSlider from "./StoreImgSlider";
import StoreImgPlusModal from "../StoreImgComponent/StoreImgPlusModal";
import { ImageInfo } from "@/recoil/memberInfoRecoil";
import { tokenHttp } from "@/api/tokenHttp";

interface MypageStoreImgProps {
  imageInfos: ImageInfo[];
}

const MypageStoreImg: React.FC<MypageStoreImgProps> = ({ imageInfos }) => {
  const imgBoxRef = useRef<HTMLDivElement>(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const [showStoreImgModal, setShowStoreImgModal] = useState(false);
  const [showStoreImgPlusModal, setShowStoreImgPlusModal] = useState(false);
  const [imgInfos, setImgInfos] = useState<ImageInfo[]>([]);

  // 이미지 클릭 핸들러
  const onImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowStoreImgModal(true);
  };

  //이미지 사이즈 변화
  useEffect(() => {
    if (imgBoxRef.current) {
      let imgBoxWidth = imgBoxRef.current.offsetWidth - 10;
      let imgSize = imgBoxWidth / 3;
      const divElements = imgBoxRef.current.querySelectorAll("div");
      divElements.forEach((div) => {
        div.style.width = imgSize.toFixed() + "px";
        div.style.height = imgSize.toFixed() + "px";
      });
    }
  }, []);

  //모달 상태 변경 핸들러
  const ModalChangeHandler = () => {
    setShowStoreImgModal(false);
    setShowStoreImgPlusModal(false);
  };

  const deleteImg = (id: number) => {
    setImgInfos((prevImageInfos) => prevImageInfos.filter((info) => info.storeImageId !== id));
  };

  const updateImg = (newUrl: string) => {
    if (!newUrl) return;

    tokenHttp
      .get("/mypage/store")
      .then((response) => {
        if (response.data.code === 200) {
          const newStoreInfo = response.data.data;
          setImgInfos(newStoreInfo.images);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onPlusClick = () => {
    setShowStoreImgPlusModal(true);
  };

  return (
    <>
      <div className={style.StoreImg}>
        <div>
          대표 사진
          <Image
            src="/img/icon/plus01.png"
            alt="plus"
            width={32}
            height={32}
            onClick={onPlusClick}
          />
        </div>

        <StoreImgSlider imageInfos={imageInfos} onImageClick={onImageClick} />
      </div>

      {showStoreImgModal && (
        <StoreImgModal
          ModalChangeHandler={ModalChangeHandler}
          imageInfos={imageInfos}
          DeleteImg={deleteImg}
          index={selectedImageIndex}
        />
      )}

      {showStoreImgPlusModal && (
        <StoreImgPlusModal
          ModalChangeHandler={ModalChangeHandler}
          UpdateImg={updateImg}
          onPlusClick={onPlusClick}
        />
      )}
    </>
  );
};

export default MypageStoreImg;
