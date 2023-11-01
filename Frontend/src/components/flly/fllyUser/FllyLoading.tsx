import React, { useEffect, useState } from "react";
import style from "./FllyLoading.module.css";
import Image from "next/image";
import { useRecoilValue, useRecoilState } from "recoil";
import { flowerState } from "@/recoil/fllyRecoil";
import OpenAI from "openai";
import { bouquetState, bouquetType } from "@/recoil/fllyRecoil";

const FllySeller = () => {
  const [imgList, setImgList] = useState<bouquetType[]>([]);

  // const OpenAI = require("openai");
  // require("dotenv").config();
  // const apiKey = process.env.OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey: "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",
    // apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const flowers = useRecoilValue(flowerState);
  const [bouquets, setBouquets] = useRecoilState(bouquetState);

  const generateImage = async () => {
    try {
      const response = await openai.images.generate({
        prompt: "a bouquet of red roses and pink astilbe",
        n: 4,
        size: "1024x1024",
      });
      console.log("ㅋㅋㅋ", response);
      const NewImage: bouquetType[] = [];
      if (response) {
        response.data.forEach((image) => {
          NewImage.push({ url: image.url });
        });
        setImgList(NewImage);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (imgList.length <= 0) {
      // generateImage();
      console.log("bouquet ", bouquets);
    } else {
      setBouquets([...bouquets, ...imgList]);
      console.log(imgList);
      console.log("페이지이동");
    }
  }, [imgList]);

  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.contentBox}>
          <div className={style.guide}>하나뿐인 꽃다발을 생성중입니다.</div>
          <Image
            src="img/homeBanner/121_pink_gomphrena.jpg"
            width={300}
            height={300}
            alt="아이콘"
          ></Image>
        </div>
      </div>
    </>
  );
};

export default FllySeller;
