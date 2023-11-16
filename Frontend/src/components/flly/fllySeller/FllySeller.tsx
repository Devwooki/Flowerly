import React, { useEffect, useState } from "react";
import style from "./style/FllySeller.module.css";

import FllySellerCard from "./fllySellerCardComponent/FllySellerCard";

import { ToastErrorMessage } from "@/model/toastMessageJHM";
import { useRouter } from "next/router";
import { tokenHttp } from "@/api/tokenHttp";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

interface FllyNearType {
  fllyId: number;
  flowerName1: string | null;
  flowerName2: string | null;
  flowerName3: string | null;
  imageUrl: string;
  progress: string;
  deadline: string;
  budget: number;
}

const FllySeller = () => {
  const [nearFllyList, setNearFllyList] = useState<FllyNearType[]>([]);
  const [dpState, setDpState] = useState<String>("delivery");
  const router = useRouter();
  const [lastRef, inView] = useInView();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  const axiosHandelr = () => {
    tokenHttp
      .get(`/seller/near/${dpState}?page=` + currentPage)
      .then((res) => {
        console.log(res);
        const rData = res.data;
        if (rData.code === 200) {
          setNearFllyList((parent) => [...parent, ...rData.data.content]);
          setTotalPage(rData.totalPages);
        }
        if (rData.code === -4004) {
          setNearFllyList([]);
          // ToastErrorMessage(rData.message);
        }
        if (res.headers.authorization) {
          localStorage.setItem("accessToken", res.headers.authorization);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
        }
      });
  };

  const ChangeStatHander = (clickBtnStat: string) => {
    setNearFllyList([]);
    setCurrentPage(0);
    setTotalPage(0);
    if (dpState !== clickBtnStat && clickBtnStat === "delivery") {
      setDpState("delivery");
    } else if (dpState !== clickBtnStat && clickBtnStat === "pickup") {
      setDpState("pickup");
    } else null;
  };

  useEffect(() => {
    axiosHandelr();
  }, [dpState]);

  useEffect(() => {
    if (totalPage !== 0) {
      axiosHandelr();
    }
  }, [inView]);

  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.header}>
          <div className={style.headerTitle}>주변 플리 목록</div>
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
          {nearFllyList.length > 0 ? (
            nearFllyList.map((value, index) => (
              <FllySellerCard key={index} $FllyDeliveryNear={value} />
            ))
          ) : (
            <div className={style.noListBox}>
              <div>
                <Image
                  src={
                    dpState === "delivery"
                      ? "/img/etc/no-delivery-image.png"
                      : "/img/etc/no-pickup-image.png"
                  }
                  width={200}
                  height={200}
                  alt="플리가 없습니다"
                ></Image>
                <div>
                  {dpState === "delivery"
                    ? "배달 가능한 플리가 없습니다"
                    : "픽업 가능한 플리가 없습니다"}
                </div>
              </div>
            </div>
          )}
          {/* 무한 스크롤 적용*/ currentPage < totalPage && <div ref={lastRef}></div>}
        </div>
      </div>
    </>
  );
};

export default FllySeller;
