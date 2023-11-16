import React, { useEffect, useRef, useState } from "react";
import style from "./style/MypageStoreImg.module.css";
import Image from "next/image";
import StoreImgModal from "../StoreImgComponent/StoreImgModal";

interface MypageStoreImgProps {
  imageUrls: string[];
}

interface ImageInfo {
  id: number;
  url: string;
}

const MypageStoreImg: React.FC<MypageStoreImgProps> = ({ imageUrls }) => {
  const imgBoxRef = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState<boolean>();
  const [parsedImages, setParsedImages] = useState<ImageInfo[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [updatedUrls, setUpdatedUrls] = useState<string[]>(imageUrls);
  // 이미지 클릭 핸들러
  const onImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setModalState(true);
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

  // 이미지 ID와 URL 분리

  // useEffect(() => {
  //   const images = imageUrls.map((imageUrl) => {
  //     const parts = imageUrl.split("_");
  //     return { id: parseInt(parts[0], 10), url: parts[1] };
  //   });
  //   setParsedImages(images);
  // }, [imageUrls]);

  // //모달 상태 변경 핸들러
  // const ModalChangeHandler = () => {
  //   setModalState(!modalState);
  // };

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

  // array.from() 함수를 사용하여 길이가 3인 배열을 만들고 imageUrls 배열의 인덱스에 값이 있는지 확인
  return (
    <>
      {/* <div className={style.StoreImg}>
        <div>대표 사진</div>

        <div className={style.ImgBox} ref={imgBoxRef}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} onClick={() => onImageClick(index)}>
              {updatedUrls[index] ? (
                <Image src={updatedUrls[index]} fill alt="대표사진" />
              ) : (
                <Image src="/img/etc/NoImg.png" fill alt="NoImg" />
              )}
            </div>
          ))}
        </div>
      </div>

      {modalState && (
        <StoreImgModal
          ModalChangeHandler={ModalChangeHandler}
          imageInfo={parsedImages}
          UpdateImg={updateImg}
          index={selectedImageIndex}
        />
      )} */}
    </>
  );
};

export default MypageStoreImg;
