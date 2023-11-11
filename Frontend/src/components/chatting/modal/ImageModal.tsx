import { useRef, useEffect } from "react";
import style from "./style/ImageModal.module.css";

type ImageModalProps = {
  modalHandler: Function;
  imgUrl: string | undefined;
};

const ImageModal: React.FC<ImageModalProps> = ({ modalHandler, imgUrl }) => {
  const imgBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    // 이미지 로드 완료 시의 콜백 함수
    img.onload = () => {
      console.log(img.height, img.width);
      let widthValue = window.innerWidth > 450 ? 450 : window.innerWidth;
      let heightValue = (widthValue * img.height) / img.width;

      if (heightValue > window.innerHeight) {
        heightValue = window.innerHeight;
        widthValue = (heightValue * img.width) / img.height;
      }

      if (imgBoxRef.current) {
        imgBoxRef.current.style.backgroundImage = `url(${imgUrl})`;
        imgBoxRef.current.style.height = `${heightValue}px`;
        imgBoxRef.current.style.width = `${widthValue}px`;
      }
    };
    if (imgUrl) img.src = imgUrl;
  }, [imgUrl]);

  return (
    <>
      <div
        className={style.modalBg}
        onClick={() => {
          modalHandler("IMAGE", false);
        }}
      >
        <div className={style.modalMain} ref={imgBoxRef}></div>
      </div>
    </>
  );
};

export default ImageModal;
