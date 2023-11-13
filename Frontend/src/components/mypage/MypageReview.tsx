import React, { useEffect, useState } from "react";
import style from "./style/MypageReview.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import MypageReviewCard from "./MyFllyListComponent/MypageReviewCard/MypageReviewCard";
import MypageReviewDeleteModal from "./MyFllyListComponent/MypageReviewCard/MypageReviewDeleteModal";
import { useRecoilState } from "recoil";
import { MemberInfo, memberInfoState } from "@/recoil/memberInfoRecoil";
import axios from "axios";
import { tokenHttp } from "@/api/tokenHttp";
import { ToastErrorMessage } from "@/model/toastMessageJHM";
interface BaseReviewType {
  reviewId: number;
  content: string;
  createdAt: string;
  type: "buyer" | "seller";
}

interface BuyerReviewType extends BaseReviewType {
  requestId: number;
  storeName: string;
  type: "buyer";
}

interface SellerReviewType extends BaseReviewType {
  consumerNickName: string;
  type: "seller";
}

type ReviewType = BuyerReviewType | SellerReviewType;

const MypageReview = () => {
  const router = useRouter();
  const [memberInfo, setMemberInfo] = useRecoilState<MemberInfo>(memberInfoState);
  const [reviewList, setReviewList] = useState<ReviewType[]>([]);

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
    if (clickIndex >= 0) {
      //해당 clickIndex의 정보를 접근해 업데이트! (이렇게 해야 화면에 변화가 생긴다)
      const updateReviewList = reviewList.filter((item, index) => index !== clickIndex);
      setReviewList(updateReviewList);
    }
  };

  //모달의 상태 변경 핸들러
  const ModalChangeHandler = () => {
    setModalState(!modalState);
  };
  //판매자 전용 (리뷰 삭제) 끝

  useEffect(() => {
    tokenHttp
      .get(memberInfo.role === "USER" ? "/review/buyer-review" : "/review/store-review")
      .then((res) => {
        if (res.data.code === 200) {
          setReviewList(res.data.data.content);
          localStorage.setItem("accessToken", res.headers.authorization);
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
          {reviewList &&
            reviewList.map((value, index) => (
              <>
                <MypageReviewCard
                  ModalChangeHandler={ModalChangeHandler}
                  SelectIdChangeHandler={SelectIdChangeHandler}
                  $requestIndex={index}
                  $reviewInfo={value}
                />
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default MypageReview;
