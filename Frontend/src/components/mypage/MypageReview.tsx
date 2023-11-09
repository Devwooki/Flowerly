import React, { useState } from "react";
import style from "./style/MypageReview.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import MypageReviewCard from "./MyFllyListComponent/MypageReviewCard/MypageReviewCard";
import MypageReviewDeleteModal from "./MyFllyListComponent/MypageReviewCard/MypageReviewDeleteModal";
import { useRecoilState } from "recoil";
import { MemberInfo, memberInfoState } from "@/recoil/memberInfoRecoil";

const MypageReview = () => {
  const router = useRouter();
  const [memberInfo, setMemberInfo] = useRecoilState<MemberInfo>(memberInfoState);

  //판매자 전용 (리뷰 삭제) 시작
  const [modalState, setModalState] = useState<Boolean>();
  //클릭한 아이템의 값
  const [selectReviewId, setSelectReviewId] = useState<number>(-1);
  const [clickIndex, setClickIndex] = useState<number>(0);

  //선택한 flly 세팅을 위한 핸들러
  const SelectIdChangeHandler = (reviewId: number, index: number) => {
    setSelectReviewId(reviewId);
    setClickIndex(index);
  };

  //모달 완료하기 클릭으로 인한 삭제여부 변경 핸들러
  const UpdateReviewList = () => {
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
  //판매자 전용 (리뷰 삭제) 끝

  return (
    <>
      <div className={style.fllyReviewBack}>
        {modalState && (
          <MypageReviewDeleteModal
            $reviewId={selectReviewId}
            ModalChangeHandler={ModalChangeHandler}
            UpdateReviewList={UpdateReviewList}
          />
        )}
        <div className={style.fllyReviewHeader}>
          <div className={style.headerTitleBox}>
            <Image
              src="/img/btn/left-btn.png"
              alt="뒤로가기"
              width={13}
              height={20}
              onClick={() => {
                router.back();
              }}
            />
            <div className={style.headerTitle}>플리 리뷰</div>
          </div>
          {memberInfo.role === "USER" ? <div>내가 쓴 리뷰</div> : <div>우리 가게 리뷰</div>}
        </div>
        <div className={style.fllyReviewMain}>
          <MypageReviewCard
            ModalChangeHandler={ModalChangeHandler}
            SelectIdChangeHandler={SelectIdChangeHandler}
            // $requestIndex = {index}
          />
        </div>
      </div>
    </>
  );
};

export default MypageReview;
