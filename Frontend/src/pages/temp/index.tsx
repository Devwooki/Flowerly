import axios from "axios";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { memberInfoState } from "../../recoil/memberInfoRecoil";

const Temp = () => {
  const [path, setPath] = useState<string | null>(null);
  const [host, setHost] = useState<string | null>(null);
  const router = useRouter();
  const setMemberInfo = useSetRecoilState(memberInfoState);
  const { token } = router.query as { token: string };

  useEffect(() => {
    if (!path && !host) {
      setPath(window.location.pathname);
      setHost(window.location.host);
    }
  }, [path, host]);

  useEffect(() => {
    if (token && host && path) {
      getMemberinfo(token);
    }
  }, [token, host, path]);

  const getMemberinfo = async (token: string) => {
    axios
      .get("https://flower-ly.co.kr/api/member", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-Host": host,
          "X-Request-Path": path,
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

          router.replace("/");

          console.log("로그인 성공");
          console.log(response.data.data);
          console.log(token);
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
