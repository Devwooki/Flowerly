import React, { useEffect, useState } from "react";
import style from "./style/FllySeller.module.css";

import FllySellerCard from "./fllySellerCardComponent/FllySellerCard";
import axios from "axios";

import { ToastErrorMessage } from "@/model/toastMessageJHM";

interface FllyNearType {
  fllyId: number;
  flowerName1: String;
  flowerName2: String;
  flowerName3: String;
  imageUrl: String;
  progress: String;
  deadline: String;
  budget: number;
}

const FllySeller = () => {
  const [nearFllyList, setNearFllyList] = useState<FllyNearType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>();
  const [dpState, setDpState] = useState<String>("delivery");

  const axiosHandelr = () => {
    axios
      .get(`https://flower-ly.co.kr/api/seller/near/${dpState}?page=` + currentPage)
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
