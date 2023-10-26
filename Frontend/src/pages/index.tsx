import { useRouter } from "next/router";
import style from "@styles/Home.module.css";
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
  return (
    <div>
      <h2 className={style.test}>Home 메인 화면</h2>
      <button onClick={() => moveToTestPage()}>테스트 페이지 이동</button>
      <button onClick={() => moveToMyPage(id)}>123번 마이페이지 페이지 이동</button>
      <div style={{ fontFamily: "GangwonEduPowerExtraBoldA" }}>
        원하는 꽃을 선택해주세요.현모테스트
      </div>
      <div style={{ fontFamily: "GangwonEduPowerExtraBoldA" }}>플리 주문서</div>
      <div style={{ fontFamily: "NanumSquareNeoOTF-Lt" }}>아름다운 꽃가게</div>
      <div style={{ fontFamily: "NanumSquareNeoOTF-Rg" }}>아름다운 꽃가게</div>
      <div style={{ fontFamily: "NanumSquareNeoOTF-Bd" }}>아름다운 꽃가게</div>
    </div>
  );
}
