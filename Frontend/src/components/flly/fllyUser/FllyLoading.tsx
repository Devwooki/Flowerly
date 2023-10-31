import React, { useEffect } from "react";
import style from "./FllyLoading.module.css";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { flowerState } from "@/recoil/fllyRecoil";
import OpenAI from 'openai';
import { bouquetState } from "@/recoil/fllyRecoil";
// import { Configuration, OpenAIApi } from "openai";
import Configuration from "openai";
import OpenAIApi from "openai";


const FllySeller = () => {
  // const { Configuration, OpenAIApi } = require('openai');

  // const configuration = new Configuration({
  //   organization: "org-pqPYvjuFC8MSuOE138uEhT2K",
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(configuration);


  const openai = require('openai');
  const api_key = process.env.OPEN_API_KEY;
  openai.api_key = api_key;

  // const openai = new OpenAI({key: process.env.OPENAI_API_KEY});

  const flowers = useRecoilValue(flowerState);
  // console.log("==================");
  // console.log("flowers", flowers);
  // console.log("==================");

  // const bouquets = [] as any[];
  const bouquets = useRecoilValue(bouquetState);

  const generateImage = async () => {
    try {
      const response = await openai.createImage({
        prompt: "a bouquet of red roses and pink astilbe",
        n: 4,
        size: "1024x1024",
      });
      console.log(response.data.data[0].url);
      console.log(response.data.data[0].base64);
      bouquets.push({
        url: response.data.data[0].url,
        base64: response.data.data[0].base64,
      });
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
    generateImage();
    console.log("bouquet ", bouquets);
  },[])


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
