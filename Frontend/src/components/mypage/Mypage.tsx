import React, { useEffect, useState } from "react";
import style from "./style/Mypage.module.css";
import MypageName from "./MyPageComponent/MypageName";
import MypageCategory from "./MyPageComponent/MypageCategory";
import MypageStoreImg from "./MyPageComponent/MypageStoreImg";
import {
  memberInfoState,
  MemberInfo,
  StoreInfo,
  storeInfoState,
  ImageInfo,
} from "@/recoil/memberInfoRecoil";
import { useRecoilState } from "recoil";
import { tokenHttp } from "@/api/tokenHttp";
import Router from "next/router";
import { ToastErrorMessage } from "@/model/toastMessageJHM";
import { useResetRecoilState } from "recoil";

interface SellerMyPageData {
  storeName: string;
  imageUrl: string[];
}

const Mypage = () => {
  const [memberInfo, setMemberInfo] = useRecoilState<MemberInfo>(memberInfoState);
  const [storeInfo, setStoreInfo] = useRecoilState<StoreInfo>(storeInfoState);
  const [sellerData, setSellerData] = useState<SellerMyPageData | null>(null);
  const [buyerData, setBuyerData] = useState<string>("");

  const resetMemberInfo = useResetRecoilState(memberInfoState);

  useEffect(() => {
    console.log(memberInfo);

    const getMyPageData = () => {
      tokenHttp
        .get(memberInfo.role === "SELLER" ? "/mypage/store" : "/mypage/buyer")
        .then((response) => {
          if (memberInfo.role === "SELLER") {
            setSellerData(response.data.data);
            setStoreInfo(response.data.data);
            const newStoreInfo = response.data.data; // 새로운 store 정보
            setMemberInfo((prevMemberInfo) => ({
              ...prevMemberInfo,
              store: newStoreInfo, // memberInfo의 store만 업데이트
            }));
          } else {
            setBuyerData(response.data.data);
          }

          if (response.headers.authorization) {
            localStorage.setItem("accessToken", response.headers.authorization);
          }
        })
        .catch((error) => {
          console.error("마이페이지 데이터를 불러오는데 실패했습니다.", error);
          if (error.response && error.response.status === 403) {
            Router.push("/fllylogin");
          }
        });
    };

    getMyPageData();
  }, []);

  const handleMyStoreInfo = () => {
    Router.push("/mypage/mystore");
  };

  const handleMyInfo = () => {
    Router.push("/mypage/myinfo");
  };

  const handleLogout = () => {
    tokenHttp
      .get("/member/logout")
      .then((res) => {
        if (res.status === 200) {
          ToastErrorMessage("로그아웃 되었습니다.");
          localStorage.removeItem("accessToken");
          resetMemberInfo();
          Router.push("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          Router.push("/fllylogin");
        }
      });
  };

  return (
    <>
      <div className={style.MyPageBack}>
        <div className={style.MyPageTitle}>마이페이지</div>

        <div className={style.NameBox}>
          {(sellerData || buyerData) && (
            <MypageName data={sellerData ? sellerData.storeName : buyerData} />
          )}
        </div>
        {memberInfo.role === "SELLER" && sellerData && (
          <div className={style.StoreImgBox}>
            <MypageStoreImg imageInfos={storeInfo.images} />
          </div>
        )}

        <div className={style.CategoryBox}>
          <MypageCategory />
        </div>
        {memberInfo.role === "SELLER" && (
          <div className={style.MypageSidBox} onClick={() => handleMyStoreInfo()}>
            <div>
              <div>가게 정보 보기</div>
              <div> &gt;</div>
            </div>
          </div>
        )}
        {memberInfo.role === "USER" && (
          <div className={style.MypageSidBox} onClick={() => handleMyInfo()}>
            <div>
              <div>내정보 수정</div>
              <div> &gt;</div>
            </div>
          </div>
        )}
        <div className={style.MypageSidBox} onClick={() => handleLogout()}>
          <div>
            <div>로그아웃</div>
            <div> &gt;</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
