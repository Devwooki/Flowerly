import React from "react";
import style from "./style/FllySellerDetail.module.css";
import Image from "next/image";

const FllySellerDetail = () => {
  return (
    <>
      <div className={style.detailBack}>
        <div
          className={style.detailHeader}
          style={{ backgroundImage: "url(/test/test-flower-img.png)" }}
        >
          <Image src="/img/btn/left-btn.png" alt="뒤로가기" width={15} height={25} />
          <Image
            className={style.partBtn}
            src="/img/btn/participate-btn2.png"
            alt="꽃"
            width={80}
            height={100}
          />
        </div>
        <div className={style.detailMain}>
          <div className={style.detailMainTitle}>의뢰 내용</div>
          <div className={style.detailMainBox}>
            <div>의뢰인</div>
            <div>닉네임 입니다</div>
          </div>
          <div className={style.detailMainBox}>
            <div>상황</div>
            <div>사랑</div>
          </div>
          <div className={style.detailMainBox}>
            <div>대상</div>
            <div>연인</div>
          </div>
          <div className={style.detailMainBox}>
            <div>색상</div>
            <div>
              <span>분홍</span>
              <span>, 파랑</span>
              <span>, 노랑</span>
            </div>
          </div>
          <div className={style.detailMainBox}>
            <div>선택한 꽃</div>
            <div>
              <div>분홍 수국 - 소녀의 꿈, 처녀의 꿈</div>
              <div>파랑 수국 - 소녀의 꿈</div>
              <div>노랑 수국 - 몰라몰라</div>
            </div>
          </div>
          <div className={style.detailMainBox}>
            <div>예산</div>
            <div>
              <span>30,000</span>
              <span> 원</span>
            </div>
          </div>
          <div className={style.detailMainBox}>
            <div>마감시간</div>
            <div>2023.10.20 18:00</div>
          </div>
          <div className={style.detailMainBox}>
            <div>주문 유형</div>
            <div>배달</div>
          </div>
          <div className={style.detailMainBox}>
            <div>주소</div>
            <div>대전광역시 유성구</div>
          </div>
          <div className={style.detailMainBox}>
            <div>요청 사항</div>
            <div>
              파랑 수국보다 분홍 수국이 더 많이 들어갔으면 좋겠어요! 20일날 고백하려고해요.. 이쁘게
              부탁드려요!! 맞아요 맞아요 그래서 말인데요 이렇게 부탁드릴수가 잇을까요 ?
              는미ㅏ런ㅁ어라ㅣㅁㄴ어리ㅏㄴ어리ㅏㄴㅁ어리ㅏㄴ어리ㅏㄴ어ㅁㄴ리ㅏ
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllySellerDetail;
