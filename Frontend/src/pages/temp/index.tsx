import axios from "axios";
import React, { useEffect } from "react";

import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { memberInfoState } from "../../recoil/memberInfoRecoil";

const Temp = () => {
  const router = useRouter();
  const setMemberInfo = useSetRecoilState(memberInfoState);
  const { token } = router.query as { token: string };

  useEffect(() => {
    if (token) {
      getMemberinfo(token);
    }
  }, [token]);

  const getMemberinfo = async (token: string) => {
    axios
      .get("https://flower-ly.co.kr/api/member", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        // memberinfo recoil에 데이터 저장, accesstoken localstorage에 저장
        // router.push("/"); // 메인 페이지로 이동
        // token(일회용 토큰) 초기화하기
        if (response.data.code === 200) {
          setMemberInfo(response.data.data);

          localStorage.setItem("accessToken", token);

          router.replace(router.pathname);

          router.push("/");
        } else {
          console.error("로그인 실패: ", response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return null;
};

export default Temp;
