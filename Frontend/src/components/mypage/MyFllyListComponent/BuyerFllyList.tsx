import React, { useState } from "react";
import BuyerFllyListCompletedCard from "./BuyerFllyListCard/BuyerFllyListCompletedCard";
import BuyerFllyListProgressCard from "./BuyerFllyListCard/BuyerFllyListProgressCard";
import MypageReviewModal from "./MypageReviewCard/MypageReviewModal";

const BuyerFllyList = () => {
  //모달 상태
  const [modalState, setModalState] = useState<Boolean>(false);
  //클릭한 아이템의 값
  const [selectId, setSelectId] = useState<number>(-1);
  const [clickIndex, setClickIndex] = useState<number>(0);

  //선택한 flly 세팅을 위한 핸들러
  const SelectIdChangeHandler = (fllyId: number, index: number) => {
    setSelectId(fllyId);
  };

  //모달 완료하기 클릭으로 인한 리뷰작성여부 변경 핸들러
  const UpdateFllyList = () => {
    //정보가 담긴 리스트를 가져온다
    //clickIndex값이 유효하다면 변경해준다 ( 추후 길이도 체크해줘야함 && clickIndex < updatedAdoptData.length 처럼)
    if (clickIndex >= 0) {
      //해당 clickIndex의 정보를 접근해 업데이트! (이렇게 해야 화면에 변화가 생긴다)
    }
  };

  //모달의 상태 변경 핸들러
  const ModalChangeHandler = () => {
    setModalState(!modalState);
  };

  return (
    <>
      {modalState && (
        <MypageReviewModal
          ModalChangeHandler={ModalChangeHandler}
          $selectId={selectId}
          UpdateFllyList={UpdateFllyList}
        />
      )}
      <BuyerFllyListCompletedCard ModalChangeHandler={ModalChangeHandler} />
      <BuyerFllyListProgressCard />
    </>
  );
};

export default BuyerFllyList;
