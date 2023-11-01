import React, { useEffect, useState } from "react";
import style from "./FllyLoading.module.css";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { flowerState } from "@/recoil/fllyRecoil";
import OpenAI from "openai";
// import Image from "openai";
import { bouquetState } from "@/recoil/fllyRecoil";
// import { Configuration, OpenAIApi } from "openai";
// import Configuration from "openai";
// import OpenAIApi from "openai";

interface imageDataType {
  url: string | undefined;
}

const FllySeller = () => {
  const [imgList, setImgList] = useState<imageDataType[]>([]);
  // const { Configuration, OpenAIApi } = require("openai");

  // const configuration = new Configuration({
  //   apiKey: "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",
  //   // dangerouslyAllowBrowser: true,
  // });

  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  // const configuration = new Configuration({
  //   organization: "org-pqPYvjuFC8MSuOE138uEhT2K",
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(configuration);

  // const openai = require("openai");
  // const api_key = process.env.OPEN_API_KEY;
  // openai.api_key = api_key;

  // const openai = new OpenAI({key: process.env.OPENAI_API_KEY});

  const flowers = useRecoilValue(flowerState);
  // console.log("==================");
  // console.log("flowers", flowers);
  // console.log("==================");

  // const bouquets = [] as any[];
  const bouquets = useRecoilValue(bouquetState);

  const generateImage = async () => {
    try {
      const response = await openai.images.generate({
        prompt: "a bouquet of red roses and pink astilbe",
        n: 4,
        size: "1024x1024",
      });
      console.log("ㅋㅋㅋ", response);
      const NewImage: imageDataType[] = [];
      if (response) {
        response.data.forEach((image) => {
          NewImage.push({ url: image.url });
        });
        setImgList(NewImage);
      }
      // console.log(response.data.data[0].base64);
      // bouquets.push({
      //   url: response.data.data[0].url,
      //   base64: response.data.data[0].base64,
      // });
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
      generateImage();
      console.log("bouquet ", bouquets);
    } else {
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
