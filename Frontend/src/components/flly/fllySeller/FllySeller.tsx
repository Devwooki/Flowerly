import React, { useEffect, useState } from "react";
import style from "./style/FllySeller.module.css";

import FllySellerCard from "./fllySellerCardComponent/FllySellerCard";

import { ToastErrorMessage } from "@/model/toastMessageJHM";
import { useRouter } from "next/router";
import { tokenHttp } from "@/api/tokenHttp";

interface FllyNearType {
  fllyId: number;
  flowerName1: string;
  flowerName2: string;
  flowerName3: string;
  imageUrl: string;
  progress: string;
  deadline: string;
  budget: number;
}

const FllySeller = () => {
  const [nearFllyList, setNearFllyList] = useState<FllyNearType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>();
  const [dpState, setDpState] = useState<String>("delivery");
  const router = useRouter();

  const axiosHandelr = () => {
    tokenHttp
      .get(`/seller/near/${dpState}?page=` + currentPage)
      .then((res) => {
        console.log(res);
        const rData = res.data;
        if (rData.code === 200) {
          setNearFllyList(rData.data.content);
          setTotalPage(rData.totalPages);
        }
        if (rData.code === -4004) {
          setNearFllyList([]);
          ToastErrorMessage(rData.message);
        }
        if (res.headers.authorization) {
          localStorage.setItem("accessToken", res.headers.authorization);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
          ToastErrorMessage("로그인 만료되어 로그인화면으로 이동합니다.");
        }
      });
  };

  const ChangeStatHander = (clickBtnStat: string) => {
    setCurrentPage(0);
    if (dpState !== clickBtnStat && clickBtnStat === "delivery") {
      setDpState("delivery");
    } else if (dpState !== clickBtnStat && clickBtnStat === "pickup") {
      setDpState("pickup");
    } else null;
  };

  useEffect(() => {
    axiosHandelr();
  }, [dpState]);

  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.header}>
          <div className={style.headerTitle}>진행중인 플리</div>
          {/* <div className={style.headerSortBox}>
            <select className={style.headerSortBoxSelect}>
              <option>최신순</option>
              <option>마감순</option>
            </select>
          </div> */}
          <div className={style.headerSideBtn}>
            <div
              className={
                dpState === "delivery" ? style.headerSideBtnCheck : style.headerSideBtnUnchek
              }
              onClick={() => {
                ChangeStatHander("delivery");
              }}
            >
              배달
            </div>
            <div
              className={
                dpState === "pickup" ? style.headerSideBtnCheck : style.headerSideBtnUnchek
              }
              onClick={() => {
                ChangeStatHander("pickup");
              }}
            >
              픽업
            </div>
          </div>
        </div>
        <div className={style.mainBox}>
          {nearFllyList.length > 0 &&
            nearFllyList.map((value, index) => (
              <FllySellerCard key={index} $FllyDeliveryNear={value} />
            ))}
        </div>
      </div>
    </>
  );
};

export default FllySeller;
