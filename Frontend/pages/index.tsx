import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const id = 28;

  //정적 라우팅
  const moveToMyPage = () => {
    router.push("/mypage");
  };

  //동적 라우팅
  const moveToUserPage = (id: number) => {
    router.push(`/mypage/${id}`);
  };

  return (
    <div>
      <div>메인 페이지</div>
      <button onClick={() => moveToMyPage()}>MyPage 이동하기</button>
      <button onClick={() => moveToUserPage(id)}>MyPage/id 이동하기</button>
    </div>
  );
}
