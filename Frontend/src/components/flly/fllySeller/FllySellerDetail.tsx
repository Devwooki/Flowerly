import React, { useEffect, useState } from "react";
import style from "./style/FllySellerDetail.module.css";
import Image from "next/image";
import RequestDetail from "./fllySellerDetailComponent/RequestDetail";
import { useParams } from "next/navigation";
import axios from "axios";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

interface flowerInfoType {
  flowerName: string;
  meaning: string;
}

interface fllyReqeustDeatilType {
  fllyId: number;
  flower1: flowerInfoType | null;
  flower2: flowerInfoType | null;
  flower3: flowerInfoType | null;
  imageUrl: string;
  orderType: string;
  progress: string;
  requestAddress: string;
  requestContent: string;
  situation: string;
  target: string;
  budget: number;
  color1: string | null;
  color2: string | null;
  color3: string | null;
  deadline: string;
  consumer: string;
}

const FllySellerDetail = () => {
  const [fllyRequestInfo, setFllyRequestInfo] = useState<fllyReqeustDeatilType>();
  const fllyId = useParams();

  useEffect(() => {
    console.log(fllyId.fllyId);
    axios.get("https://flower-ly.co.kr/api/seller/request/" + fllyId.fllyId).then((res) => {
      const rsData = res.data;
      if (rsData.code == 200) {
        console.log(res.data.data);
        setFllyRequestInfo(rsData.data);
      } else {
        ToastErrorMessage(rsData.message);
      }
    });
  }, []);

  return (
    <>
      <div className={style.detailBack}>
        <div
          className={style.detailHeader}
          style={{ backgroundImage: `url(${fllyRequestInfo?.imageUrl})` }}
        >
          <Image src="/img/btn/left-btn.png" alt="뒤로가기" width={15} height={25} />
          <Image
            className={style.partBtn}
            src="/img/btn/participate-btn2.png"
            alt="꽃"
            width={80}
            height={100}
          />
        </div>
        <div className={style.detailMain}>
          {fllyRequestInfo && <RequestDetail $fllyRequestInfo={fllyRequestInfo} />}
        </div>
      </div>
    </>
  );
};

export default FllySellerDetail;
