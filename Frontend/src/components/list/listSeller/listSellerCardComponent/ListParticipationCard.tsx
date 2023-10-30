import React from "react";
import style from "./ListParticipationCard.module.css";
import Image from "next/image";

const ListParticipationCard = () => {
  return (
    <>
      <div className={style.cardBack}>
        <div className={style.requestBox}>
          <div className={style.imageBox}>
            <div style={{ backgroundImage: `url(${"/test/test-flower-img.png"})` }} />
          </div>
          <div className={style.cardInfoBox}>
            <div className={style.cardInfoBtn}>
              자세히보기<span>&gt;</span>
            </div>
            <div className={style.cardInfo}>
              <div>
                <Image src="/img/icon/seller-flower.png" width={20} height={20} alt="상태이미지" />
                <div>파란 수국, 분홍 수국sadfasdsdfasdfasdfasdasdfsd</div>
              </div>
              <div>
                <Image src="/img/icon/seller-money.png" width={20} height={20} alt="상태이미지" />
                <div>30,000원</div>
              </div>
              <div>
                <Image src="/img/icon/seller-time.png" width={20} height={20} alt="상태이미지" />
                <div>~23.10.20. 18:00</div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.responseBox}>
          <div className={style.imageBox}>
            <div style={{ backgroundImage: `url(${"/test/test-flower-img.png"})` }} />
          </div>
          <div className={style.cardResponseBox}>
            <div>
              <div className={style.cardResponseInfo}>
                <Image src="/img/icon/seller-money.png" width={20} height={20} alt="상태이미지" />
                <div>30,000원asdsadsadsasdsadsadsa</div>
              </div>
              <div className={style.responseText}>
                요청 사항 대로 예쁘게 asdsad만들어 드릴게요~ asdsda이렇게 하면 정말 좋을거 같은데
                이건
                어떠신가요?asdlfjsdlakfjklasdfjklsdajfl;kasㅁㄴㅇ라ㅓㅣㅁㄴ아러ㅏㅣㅁㄴ어리ㅏㅓㅁㄴ아ㅣ;러마ㅣ;ㄴ럼ㄴ아ㅣ;ㅓㅁㄴ아ㅣ;럼;ㄴ아ㅣ
              </div>
            </div>
          </div>
        </div>
        <div className={style.footerBox}>입찰중</div>
      </div>
    </>
  );
};

export default ListParticipationCard;
