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
    try {
      const response = await axios.get("https://flower-ly.co.kr/api/member", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-Host": host,
          "X-Request-Path": path,
        },
      });

      if (response.data.code === 200) {
        setMemberInfo(response.data.data);

        const accessToken = response.headers.Authorization;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          console.log("액세스 토큰 로컬 스토리지에 저장 완료");
        }

        router.replace("/");
        console.log("로그인 성공", response.data.data);
      } else {
        console.error("로그인 실패: ", response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return null;
};

export default Temp;
