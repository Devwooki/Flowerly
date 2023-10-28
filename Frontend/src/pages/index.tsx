import { useRouter } from "next/router";
import style from "@styles/Home.module.css";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const id = 123;

  //정적 라우팅
  const moveToTestPage = () => {
    router.push("/testpage");
  };

  //동적 라우팅
  const moveToMyPage = (id: number) => {
    router.push(`/mypage/${id}`);
  };

  async function callGetAddressAPI() {
    const confmKey = "U01TX0FVVEgyMDIzMTAyNjE0NDMzNjExNDIxNjI="; // 여기에 승인키를 넣으세요
    const countPerPage = 4; // 페이지당 결과 개수
    const keyword = "탄방동"; // 검색어

    try {
      const response = await axios.get(`https://business.juso.go.kr/addrlink/addrLinkApi.do`, {
        params: {
          confmKey,
          currentPage: 5,
          countPerPage,
          keyword,
          resultType: "json", // JSON 형식으로 결과 요청
        },
      });

      if (response.status === 200) {
        console.log(response.data.results.common);
        return response.data;
      } else {
        throw new Error(`Failed to retrieve data. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  }

  return (
    <div>
      <h2 className={style.test}>Home 메인 화면</h2>
      <button onClick={() => moveToTestPage()}>테스트 페이지 이동</button>
      <button onClick={() => moveToMyPage(id)}>123번 마이페이지 페이지 이동</button>
      <div className={style.test2} style={{ fontFamily: "Pretendard-Bold", fontSize: "30px" }}>
        원하는 꽃을 선택해주세요.
      </div>
      <div style={{ fontFamily: "Pretendard-Bold", fontSize: "20px" }}>플리 주문서</div>
      <div style={{ fontFamily: "Pretendard-Bold", fontSize: "20px" }}>참여한 플리</div>
      <div>아름다운 꽃가게</div>
      <div>아름다운 꽃가게</div>
      <div>
        요청사항 입니다. 요청사항 입니다. 요청사항 입니다. 요청사항 입니다. 요청사항 입니다.
      </div>
      <button onClick={() => callGetAddressAPI()}>주소 불러</button>
      <div className={style.rose}>
        <div className={style.roseItem1} style={{ backgroundImage: "url(/test/vertical.jpg)" }}>
          aa
        </div>
        <div className={style.roseItem2} style={{ backgroundImage: "url(/test/horizental.jpg)" }}>
          bb
        </div>
      </div>
    </div>
  );
}
