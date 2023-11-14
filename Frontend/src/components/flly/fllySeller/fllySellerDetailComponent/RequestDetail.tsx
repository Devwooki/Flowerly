import React from "react";
import style from "./RequestDetail.module.css";

interface flowerInfoType {
  flowerName: string;
  meaning: string;
}

interface fllyReqeustDeatilType {
  fllyId: number;
  flower1: flowerInfoType | null;
  flower2: flowerInfoType | null;
  flower3: flowerInfoType | null;
  imageUrl: string;
  orderType: string;
  progress: string;
  requestAddress: string;
  requestContent: string;
  situation: string;
  target: string;
  budget: number;
  color1: string | null;
  color2: string | null;
  color3: string | null;
  deadline: string;
  consumer: string;
}

const RequestDetail = ({ $fllyRequestInfo }: { $fllyRequestInfo: fllyReqeustDeatilType }) => {
  return (
    <div>
      <div className={style.detailMainTitle}>의뢰 내용</div>
      <div className={style.detailMainBox}>
        <div>의뢰인</div>
        <div>{$fllyRequestInfo.consumer}</div>
      </div>
      <div className={style.detailMainBox}>
        <div>상황</div>
        <div>{$fllyRequestInfo.situation}</div>
      </div>
      <div className={style.detailMainBox}>
        <div>대상</div>
        <div>{$fllyRequestInfo.target}</div>
      </div>
      <div className={style.detailMainBox}>
        <div>색상</div>
        <div>
          {$fllyRequestInfo.color1 && <span>{$fllyRequestInfo.color1}</span>}
          {$fllyRequestInfo.color2 && <span>, {$fllyRequestInfo.color2}</span>}
          {$fllyRequestInfo.color3 && <span>, {$fllyRequestInfo.color3} </span>}
          {$fllyRequestInfo.color1 === null &&
            $fllyRequestInfo.color2 === null &&
            $fllyRequestInfo === null && <span>랜덤</span>}
        </div>
      </div>
      <div className={style.detailMainBox}>
        <div>선택한 꽃</div>
        <div>
          {$fllyRequestInfo.flower1 && (
            <div>
              {$fllyRequestInfo.flower1?.flowerName} - {$fllyRequestInfo.flower1?.meaning}
            </div>
          )}
          {$fllyRequestInfo.flower2 && (
            <div>
              {$fllyRequestInfo.flower2?.flowerName} - {$fllyRequestInfo.flower2?.meaning}
            </div>
          )}
          {$fllyRequestInfo.flower3 && (
            <div>
              {$fllyRequestInfo.flower3?.flowerName} - {$fllyRequestInfo.flower3?.meaning}
            </div>
          )}
          {$fllyRequestInfo.flower1 === null &&
            $fllyRequestInfo.flower2 === null &&
            $fllyRequestInfo.flower3 === null && <div>랜덤</div>}
        </div>
      </div>
      <div className={style.detailMainBox}>
        <div>예산</div>
        <div>
          <span>{Number($fllyRequestInfo.budget).toLocaleString()} </span>
          <span> 원</span>
        </div>
      </div>
      <div className={style.detailMainBox}>
        <div>마감시간</div>
        <div>{$fllyRequestInfo.deadline}</div>
      </div>
      <div className={style.detailMainBox}>
        <div>주문 유형</div>
        <div>{$fllyRequestInfo.orderType}</div>
      </div>
      {$fllyRequestInfo.orderType === "배달" && (
        <div className={style.detailMainBox}>
          <div>주소</div>
          <div>{$fllyRequestInfo.requestAddress}</div>
        </div>
      )}
      <div className={style.detailMainBox}>
        <div>요청 사항</div>
        <div>{$fllyRequestInfo.requestContent}</div>
      </div>
    </div>
  );
};

export default RequestDetail;
