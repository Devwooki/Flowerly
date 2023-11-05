import React from "react";
import style from "./ResponseDetail.module.css";
interface fllyResponeType {
  content: string;
  fllyParticipationId: number;
  requestImageUrl: string;
  requestPrice: number;
}

const ResponseDetail = ({ $fllyResponseInfo }: { $fllyResponseInfo: fllyResponeType }) => {
  return (
    <>
      <div className={style.responseBack}>
        <div className={style.detailMainTitle}>제안 내용</div>
        <div className={style.detailMainBox}>
          <div className={style.detailInfo}>
            <div>제안금액</div>
            <div>
              {$fllyResponseInfo.requestPrice}
              <span>원</span>
            </div>
          </div>
          <div className={style.detailInfo}>
            <div>설명</div>
            <div>{$fllyResponseInfo.content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponseDetail;
