import React from "react";
import style from "./ListAdoptCard.module.css";
import Image from "next/image";

const ListAdoptCard = () => {
  const urlSrc = "/img/icon/flower-bouquet.png";

  return (
    <>
      <div className={style.cardBack}>
        <div className={style.cardHeader}>
          <div className={style.cardHeaderImg}>
            <div style={{ backgroundImage: `url(${"/test/test-flower-img.png"})` }} />
          </div>
          <div className={style.cardHeaderInfoBox}>
            <div className={style.cardHeaderInfo}>
              <div>
                <Image
                  src="/img/icon/list-seller-user.png"
                  width={18}
                  height={18}
                  alt="상태이미지"
                />
                <div>김동민</div>
              </div>
              <div>
                <Image
                  src="/img/icon/list-seller-phon.png"
                  width={18}
                  height={18}
                  alt="상태이미지"
                />
                <div>010-1234-5678</div>
              </div>
              <div>
                <Image
                  src="/img/icon/list-seller-forward.png"
                  width={18}
                  height={18}
                  alt="상태이미지"
                />
                <div>배달</div>
              </div>
              <div>
                <Image
                  src="/img/icon/list-seller-time.png"
                  width={18}
                  height={18}
                  alt="상태이미지"
                />
                <div>23.10.21 18:00</div>
              </div>
            </div>
            <div>
              주문서 보기<span> &gt;</span>
            </div>
          </div>
        </div>
        <div className={style.cardMain}>
          <div className={style.cardMainState}>
            <Image src={urlSrc} width={16} height={16} alt="상태이미지"></Image>
            <span>제작중</span>
          </div>
          <div className={style.cardFinshBtn}>완료하기</div>
        </div>
      </div>
    </>
  );
};

export default ListAdoptCard;
