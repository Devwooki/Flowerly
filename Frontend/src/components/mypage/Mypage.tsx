import React, { useEffect, useState } from "react";
import style from "./style/Mypage.module.css";
import MypageName from "./MyPageComponent/MypageName";
import MypageCategory from "./MyPageComponent/MypageCategory";
import MypageStoreImg from "./MyPageComponent/MypageStoreImg";
import { memberInfoState, MemberInfo } from "@/recoil/memberInfoRecoil";
import { useRecoilState } from "recoil";
import { tokenHttp } from "@/api/tokenHttp";
import Router from "next/router";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

interface SellerMyPageData {
  storeName: string;
  imageUrl: string[];
}

interface BuyerMyPageData {
  nickName: string;
}

const Mypage = () => {
  const [memberInfo, setMemberInfo] = useRecoilState<MemberInfo>(memberInfoState);
  const [sellerData, setSellerData] = useState<SellerMyPageData | null>(null);
  const [buyerData, setBuyerData] = useState<BuyerMyPageData | null>(null);

  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  useEffect(() => {
    console.log(memberInfo);

    const getMyPageData = () => {
      tokenHttp
        .get(memberInfo.role === "SELLER" ? "/mypage/seller" : "/mypage/buyer")
        .then((response) => {
          if (memberInfo.role === "SELLER") {
            setSellerData(response.data.data);
          } else {
            setBuyerData(response.data.data);
            console.log(response.data.data);
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
  }, [memberInfo]);

  const handleMyStoreInfo = () => {
    Router.push("/mypage/mystore");
  };

  return (
    <>
      <div className={style.MyPageBack}>
        <div className={style.MyPageTitle}>마이페이지</div>

        <div className={style.NameBox}>
          {(sellerData || buyerData) && (
            <MypageName
              data={sellerData ? sellerData.storeName : buyerData ? buyerData.nickName : ""}
            />
          )}
        </div>
        {memberInfo.role === "SELLER" && sellerData && (
          <div className={style.StoreImgBox}>
            <MypageStoreImg imageUrls={sellerData.imageUrl} />
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
          <div className={style.MypageSidBox}>
            <div>
              <div>내정보 수정 </div>
              <div> &gt;</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Mypage;
