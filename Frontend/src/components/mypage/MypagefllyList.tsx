import React, { useState } from "react";
import style from "./style/MypagefllyList.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import SellerFllyList from "./MyFllyListComponent/SellerFllyList";
import BuyerFllyList from "./MyFllyListComponent/BuyerFllyList";
import MypageReviewModal from "./MyFllyListComponent/MypageReviewCard/MypageReviewModal";

const MypagefllyList = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<string>("buyer");

  //모달 상태
  const [modalState, setModalStest] = useState<Boolean>(false);
  //클릭한 아이템의 값
  const [selectId, setSelectId] = useState<number>(-1);
  const [clickIndex, setClickIndex] = useState<number>(0);

  //선택한 flly 세팅을 위한 핸들러
  const SelectIdChangeHandler = (fllyId: number, index: number) => {
    setSelectId(fllyId);
  };

  //모달 완료하기 클릭으로 인한 리뷰작성여부 변경 핸들러
  const UpdateAdptList = (fllyUpdateReviewState: boolean) => {
    //정보가 담긴 리스트를 가져온다
    //clickIndex값이 유효하다면 변경해준다 ( 추후 길이도 체크해줘야함 && clickIndex < updatedAdoptData.length 처럼)
    if (clickIndex >= 0) {
      //해당 clickIndex의 정보를 접근해 업데이트! (이렇게 해야 화면에 변화가 생긴다)
    }
  };

  //모달의 상태 변경 핸들러
  const ModalChangeHandler = () => {
    setModalStest(!modalState);
  };

  return (
    <>
      <div className={style.fllyListBack}>
        {modalState && (
          <MypageReviewModal
            ModalChangeHandler={ModalChangeHandler}
            $selectId={selectId}
            UpdateAdptList={UpdateAdptList}
          />
        )}
        <div className={style.fllyListHeader}>
          <Image
            src="/img/btn/left-btn.png"
            alt="뒤로가기"
            width={13}
            height={20}
            onClick={() => {
              router.back();
            }}
          />
          <div className={style.headerTitle}>플리 내역</div>
        </div>
        <div className={style.fllyListMain}>
          {userType === "seller" && <SellerFllyList />}
          {userType === "buyer" && <BuyerFllyList />}
        </div>
      </div>
    </>
  );
};

export default MypagefllyList;
