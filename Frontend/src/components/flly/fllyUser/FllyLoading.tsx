import React from "react";
import style from "./FllyLoading.module.css";
import Image from "next/image";
import { useRecoilValue } from "recoil";

import { flowerState } from "@/recoil/fllyRecoil";

const FllySeller = () => {
  
  const flowers = useRecoilValue(flowerState);

  console.log("==================");
  console.log("flowers", flowers);
  console.log("==================");

  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.contentBox}>
          <div className={style.guide}>하나뿐인 꽃다발을 생성중입니다.</div>
          <Image src="img/homeBanner/121_pink_gomphrena.jpg" width={300} height={300} alt="아이콘" ></Image>
        </div>
      </div>
    </>
  );
};

export default FllySeller;
