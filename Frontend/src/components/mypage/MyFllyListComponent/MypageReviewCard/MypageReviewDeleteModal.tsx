import React from "react";
import style from "./MypageReviewDeleteModal.module.css";

interface Props {
  ModalChangeHandler: () => void;
  $reviewId: number;
  UpdateReviewList: () => void;
}

const MypageReviewDeleteModal = ({ ModalChangeHandler, $reviewId, UpdateReviewList }: Props) => {
  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    //상위 함수를 실행하지 말아라 (모달 꺼지는거 방지)
    e.stopPropagation();
  };

  //삭제하기 눌렀을때
  const SummitBtnHandler = () => {
    console.log($reviewId);
  };

  return (
    <>
      <div className={style.checkBack} onClick={ModalChangeHandler}>
        <div className={style.modalBack} onClick={NotClickEventHandler}>
          <div>리뷰를 삭제하시겠습니까?</div>
          <div>리뷰 삭제시 재 작성 및 복구가 불가능합니다</div>
          <div className={style.modalBtnBox}>
            <div onClick={ModalChangeHandler}>취소</div>
            <div onClick={SummitBtnHandler}>확인</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MypageReviewDeleteModal;
