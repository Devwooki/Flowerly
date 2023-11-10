import React from "react";
import style from "./style/MyPageStore.module.css";
import Image from "next/image";
import Router from "next/router";

const MyPageStore = () => {
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
              <div className={style.storeInfoContent}>상호명가져와라</div>
            </div>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>사업자명</div>
              <div className={style.storeInfoContent}>사업자명</div>
            </div>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>전화번호</div>
              <div className={style.storeInfoContent}>010-1234-1234</div>
            </div>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>사업자등록번호</div>
              <div className={style.storeInfoContent}>0000000</div>
            </div>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>주소</div>
              <div className={style.storeInfoContent}>기본주소</div>
              <div className={style.storeInfoContent}>상세주소</div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default MyPageStore;
