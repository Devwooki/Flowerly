import React, { useEffect, useRef, useState } from "react";
import style from "./style/MypageStoreImg.module.css";
import Image from "next/image";
import StoreImgModal from "../StoreImgComponent/StoreImgModal";
import StoreImgSlider from "./StoreImgSlider";
import StoreImgPlusModal from "../StoreImgComponent/StoreImgPlusModal";
import {
  ImageInfo,
  MemberInfo,
  StoreInfo,
  memberInfoState,
  storeInfoState,
} from "@/recoil/memberInfoRecoil";
import { tokenHttp } from "@/api/tokenHttp";
import { useRecoilSnapshot, useRecoilState } from "recoil";

interface MypageStoreImgProps {
  imageInfos: ImageInfo[];
}

const MypageStoreImg: React.FC<MypageStoreImgProps> = ({ imageInfos }) => {
  const imgBoxRef = useRef<HTMLDivElement>(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showStoreImgModal, setShowStoreImgModal] = useState(false);
  const [showStoreImgPlusModal, setShowStoreImgPlusModal] = useState(false);
  const [storeInfoRecoil, setStoreInfoRecoil] = useRecoilState(storeInfoState);
  const [imgInfos, setImgInfos] = useState<ImageInfo[]>(imageInfos);

  // 이미지 클릭 핸들러
  const onImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowStoreImgModal(true);
  };

  //모달 상태 변경 핸들러
  const ModalChangeHandler = () => {
    setShowStoreImgModal(false);
    setShowStoreImgPlusModal(false);
  };

  const deleteImg = (id: number) => {
    setImgInfos((prevImageInfos) => prevImageInfos.filter((info) => info.storeImageId !== id));
  };

  const updateImg = (newUrl: string) => {
    // console.log("update", newUrl);
    if (!newUrl) return;

    tokenHttp
      .get("/mypage/store")
      .then((response) => {
        if (response.data.code === 200) {
          const newStoreInfo = response.data.data;
          setStoreInfoRecoil(newStoreInfo);
          setImgInfos([...newStoreInfo.images]);
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
          <div>대표 사진</div>
          <Image
            src="/img/icon/plus01.png"
            alt="plus"
            width={30}
            height={30}
            onClick={onPlusClick}
          />
        </div>

        <StoreImgSlider imageInfos={imgInfos} onImageClick={onImageClick} />
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
