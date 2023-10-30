import { useRouter } from "next/router";
import style from "@styles/Home.module.css";
import { useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  // const router = useRouter();
  // const id = 123;

  // //정적 라우팅
  // const moveToTestPage = () => {
  //   router.push("/testpage");
  // };

  // //동적 라우팅
  // const moveToMyPage = (id: number) => {
  //   router.push(`/mypage/${id}`);
  // };

  // async function callGetAddressAPI() {
  //   const confmKey = "U01TX0FVVEgyMDIzMTAyNjE0NDMzNjExNDIxNjI="; // 여기에 승인키를 넣으세요
  //   const countPerPage = 4; // 페이지당 결과 개수
  //   const keyword = "탄방동"; // 검색어

  //   try {
  //     const response = await axios.get(`https://business.juso.go.kr/addrlink/addrLinkApi.do`, {
  //       params: {
  //         confmKey,
  //         currentPage: 5,
  //         countPerPage,
  //         keyword,
  //         resultType: "json", // JSON 형식으로 결과 요청
  //       },
  //     });

  //     if (response.status === 200) {
  //       console.log(response.data.results.common);
  //       return response.data;
  //     } else {
  //       throw new Error(`Failed to retrieve data. Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("API call error:", error);
  //     throw error;
  //   }
  // }

  return (
    <div className={style.home}>
      <div className={style.mainHeader}>
        <div className={style.header}>플리로고</div>
        <div className={style.title}>플리가 추천하는</div>
        <div className={style.title}>가을의 꽃을 만나보세요</div>
      </div>
      <div className={style.bannerImg}>
        <Image src="/img/homeBanner/cosmos.jpg" alt="코스모스" fill />
        <div className={style.imgDisc}>
          <div>9월~10월</div>
          <div>핑크뮬리</div>
          <div>꽃말쓸꺼임 그냥 낭만 문구쓸거임</div>
        </div>
      </div>
    </div>
  );
}
