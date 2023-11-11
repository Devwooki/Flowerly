import { useRef, useEffect } from "react";
import style from "./style/ImageMsg.module.css";

type ImageMsgProps = {
  imgUrl: string;
  onImageLoad: Function;
  modalHandler: Function;
};

const ImageMsg: React.FC<ImageMsgProps> = ({ imgUrl, onImageLoad, modalHandler }) => {
  const imgBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    // 이미지 로드 완료 시의 콜백 함수
    img.onload = () => {
      const heightValue = 240 * (img.height / img.width);
      if (imgBoxRef.current) {
        imgBoxRef.current.style.backgroundImage = `url(${imgUrl})`;
        imgBoxRef.current.style.height = `${heightValue}px`;
      }
      onImageLoad();
    };
    img.src = imgUrl;
  }, [imgUrl]);

  return (
    <>
      <div
        className={style.mainBox}
        ref={imgBoxRef}
        onClick={() => {
          modalHandler("IMAGE", true, imgUrl);
        }}
      ></div>
    </>
  );
};

export default ImageMsg;
