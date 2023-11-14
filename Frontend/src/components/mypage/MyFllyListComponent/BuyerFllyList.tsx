import React, { useEffect, useState } from "react";
import BuyerFllyListCompletedCard from "./BuyerFllyListCard/BuyerFllyListCompletedCard";
import BuyerFllyListProgressCard from "./BuyerFllyListCard/BuyerFllyListProgressCard";
import MypageReviewModal from "./MypageReviewCard/MypageReviewModal";
import style from "./style/BuyerFllyList.module.css";
import { tokenHttp } from "@/api/tokenHttp";
import router from "next/router";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

interface BuyerFillListType {
  fllyId: number;
  buyerNickName: string;
  deliveryPickupTime: string;
  progress: string;
  storeName: string;
  fllyOrderType: string;
  requestOrderType: string;
  isReviewed: boolean;
}

const BuyerFllyList = () => {
  const [buyerFllyList, setBuyerFllyList] = useState<BuyerFillListType[]>([]);

  //모달 상태
  const [modalState, setModalState] = useState<Boolean>(false);
  //클릭한 아이템의 값
  const [selectId, setSelectId] = useState<number>(-1);
  const [clickIndex, setClickIndex] = useState<number>(0);

  //선택한 flly 세팅을 위한 핸들러
  const SelectIdChangeHandler = (fllyId: number, index: number) => {
    setSelectId(fllyId);
    setClickIndex(index);
  };

  //모달 완료하기 클릭으로 인한 리뷰작성여부 변경 핸들러 (이게 실행됬다는건 리뷰가 작성되었따는뜻)
  const UpdateFllyList = () => {
    const updateFllyListData = [...buyerFllyList];
    //정보가 담긴 리스트를 가져온다
    //clickIndex값이 유효하다면 변경해준다 ( 추후 길이도 체크해줘야함 && clickIndex < updatedAdoptData.length 처럼)
    if (clickIndex >= 0) {
      //해당 clickIndex의 정보를 접근해 업데이트! (이렇게 해야 화면에 변화가 생긴다)
      updateFllyListData[clickIndex].isReviewed = false;
      setBuyerFllyList(updateFllyListData);
    }
  };

  //모달의 상태 변경 핸들러
  const ModalChangeHandler = () => {
    setModalState(!modalState);
  };

  useEffect(() => {
    tokenHttp
      .get("/mypage/buyer/flly")
      .then((res) => {
        if (res.data.code === 200) {
          setBuyerFllyList(res.data.data);

          if (res.headers.authorization) {
            localStorage.setItem("accessToken", res.headers.authorization);
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
          ToastErrorMessage("로그인 만료되어 로그인화면으로 이동합니다.");
        }
      });
  }, []);

  return (
    <>
      {modalState && (
        <MypageReviewModal
          ModalChangeHandler={ModalChangeHandler}
          $selectId={selectId}
          UpdateFllyList={UpdateFllyList}
        />
      )}
      <div className={style.buyerBack}>
        {buyerFllyList &&
          buyerFllyList.map((value, index) => (
            <>
              {value.progress === "픽업/배달완료" ? (
                <BuyerFllyListCompletedCard
                  ModalChangeHandler={ModalChangeHandler}
                  $fllyInfo={value}
                  SelectIdChangeHandler={SelectIdChangeHandler}
                  $index={index}
                />
              ) : (
                <BuyerFllyListProgressCard $fllyInfo={value} />
              )}
            </>
          ))}
      </div>
    </>
  );
};

export default BuyerFllyList;
