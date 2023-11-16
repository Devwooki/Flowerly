import React, { useEffect, useRef, useState } from "react";
import style from "./style/MypageStoreImg.module.css";
import Image from "next/image";
import StoreImgModal from "../StoreImgComponent/StoreImgModal";
import StoreImgSlider from "./StoreImgSlider";
import StoreImgPlusModal from "../StoreImgComponent/StoreImgPlusModal";

interface MypageStoreImgProps {
  imageUrls: string[];
}

interface ImageInfo {
  id: number;
  url: string;
}

const MypageStoreImg: React.FC<MypageStoreImgProps> = ({ imageUrls }) => {
  const imgBoxRef = useRef<HTMLDivElement>(null);

  const [parsedImages, setParsedImages] = useState<ImageInfo[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [updatedUrls, setUpdatedUrls] = useState<string[]>(imageUrls);
  const [showStoreImgModal, setShowStoreImgModal] = useState(false);
  const [showStoreImgPlusModal, setShowStoreImgPlusModal] = useState(false);

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

  useEffect(() => {
    const images = imageUrls.map((imageUrl) => {
      const parts = imageUrl.split("_");
      return { id: parseInt(parts[0], 10), url: parts[1] };
    });
    setParsedImages(images);
  }, [imageUrls]);

  //모달 상태 변경 핸들러
  const ModalChangeHandler = () => {
    setShowStoreImgModal(false);
    setShowStoreImgPlusModal(false);
  };

  // updateImg 함수

  const updateImg = (newUrl: string) => {
    if (selectedImageIndex !== null) {
      const replacedUrls = [...imageUrls];
      if (newUrl === "") {
        replacedUrls.splice(selectedImageIndex, 1);
      } else {
        replacedUrls[selectedImageIndex] = newUrl;
      }
      setUpdatedUrls(replacedUrls);
    }
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

        <StoreImgSlider imageUrls={imageUrls} onImageClick={onImageClick} />
      </div>

      {showStoreImgModal && (
        <StoreImgModal
          ModalChangeHandler={ModalChangeHandler}
          imageInfo={parsedImages}
          UpdateImg={updateImg}
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
