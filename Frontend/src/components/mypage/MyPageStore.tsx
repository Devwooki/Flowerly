import React, { useEffect, useState } from "react";
import style from "./style/MyPageStore.module.css";
import Image from "next/image";
import Router from "next/router";
import { tokenHttp } from "@/api/tokenHttp";
import { useRecoilState } from "recoil";
import { selector, useRecoilValue, useSetRecoilState, RecoilState } from "recoil";
import { memberInfoState } from "@/recoil/memberInfoRecoil";

export interface ServerStoreInfo {
  storeName: string;
  sellerName: string;
  phoneNumber: string;
  storeNumber: string;
  address: string;
  storeId: number;
}

const MyPageStore = () => {
  const [memberInfo, setMemberInfo] = useRecoilState(memberInfoState);
  const addressPart = memberInfo?.store?.address
    ? memberInfo.store.address.split("T")
    : ["기본주소 없음", "상세주소 없음"];

  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  useEffect(() => {
    const getMyPageStoreData = () => {
      tokenHttp
        .get("/mypage/store")
        .then((response) => {
          if (response.data.code === 200) {
            const serverData = response.data.data as ServerStoreInfo;
            setMemberInfo((prevInfo) => ({
              ...prevInfo,
              store: {
                ...prevInfo.store,
                storeInfoId: serverData.storeId,
                storeName: serverData.storeName,
                sellerName: serverData.sellerName,
                phoneNumber: serverData.phoneNumber,
                storeNumber: serverData.storeNumber,
                address: serverData.address,
                images: prevInfo.store?.images || [],
              },
            }));

            if (response.headers.authorization) {
              localStorage.setItem("accessToken", response.headers.authorization);
            }
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            Router.push("/fllylogin");
          }
        });
    };

    getMyPageStoreData();
  }, [setMemberInfo]);

  const handleModifyBtn = () => {
    Router.push("/mypage/mystore/edit");
  };

  return (
    <>
      <div className={style.myStoreBack}>
        <div className={style.myStoreHeader}>
          <Image
            src="/img/btn/left-btn.png"
            alt="뒤로가기"
            width={13}
            height={20}
            onClick={() => {
              Router.back();
            }}
          />
          <div>가게 정보 관리</div>
        </div>

        <div className={style.myStoreMain}>
          <>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>상호명</div>
              <div className={style.storeInfoContent}>{memberInfo.store?.storeName}</div>
            </div>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>사업자명</div>
              <div className={style.storeInfoContent}>{memberInfo?.store?.sellerName}</div>
            </div>

            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>전화번호</div>
              <div className={style.storeInfoContent}>{memberInfo?.store?.phoneNumber}</div>
            </div>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>사업자등록번호</div>
              <div className={style.storeInfoContent}>{memberInfo?.store?.storeNumber}</div>
            </div>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>주소</div>
              <div className={style.storeInfoContent}>
                {addressPart ? addressPart[0] : "기본주소 없음"}
              </div>
              <div className={style.storeInfoContent}>
                {addressPart ? addressPart[1] : "상세주소 없음"}
              </div>
            </div>
          </>
        </div>
        <div className={style.modifyBtn} onClick={() => handleModifyBtn()}>
          수정하기
        </div>
      </div>
    </>
  );
};

export default MyPageStore;
