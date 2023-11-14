import React from "react";
import style from "./MypageReviewDeleteModal.module.css";
import { ToastSuccessMessage } from "@/model/toastMessageJHM";
import { tokenHttp } from "@/api/chattingTokenHttp";
import router from "next/router";

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
    //만약 200이라면 삭제 리뷰 아이디 엑시오스로 요청

    tokenHttp
      .delete(`/review/delete/${$reviewId}`)
      .then((res) => {
        if (res.data.code === 200) {
          UpdateReviewList();
          ToastSuccessMessage("리뷰가 삭제되었습니다.");
          ModalChangeHandler();

          if (res.headers.authorization) {
            localStorage.setItem("accessToken", res.headers.authorization);
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
        }
      });
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
