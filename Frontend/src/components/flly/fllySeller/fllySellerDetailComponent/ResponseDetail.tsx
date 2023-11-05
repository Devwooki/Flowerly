import React from "react";
import style from "./ResponseDetail.module.css";

const ResponseDetail = () => {
  return (
    <>
      <div className={style.responseBack}>
        <div className={style.detailMainTitle}>의뢰 내용</div>
        <div className={style.detailMainBox}>
          <div className={style.detailInfo}>
            <div>제안금액</div>
            <div>
              28,000<span>원</span>
            </div>
          </div>
          <div className={style.detailInfo}>
            <div>설명</div>
            <div>
              ㅁㄴ이라ㅓㄴㅇ미ㅏ럼ㄴ이ㅏ럼ㄴ이ㅏㅓㄹ니ㅏ럼니ㅏㅇ;러미낭;ㅓ리만ㅇ;ㅓ리만얼미나언이ㅏㅓㄹㅇ
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponseDetail;
