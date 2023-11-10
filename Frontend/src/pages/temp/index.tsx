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
  const { tempToken } = router.query as { tempToken: string };

  useEffect(() => {
    if (!path && !host) {
      setPath(window.location.pathname);
      setHost(window.location.host);
    }
  }, [path, host]);

  useEffect(() => {
    if (tempToken && host && path) {
      getMemberinfo(tempToken);
    }
  }, [tempToken, host, path]);

  const getMemberinfo = async (tempToken: string) => {
    try {
      const response = await axios.get("https://flower-ly.co.kr/api/member", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${tempToken}`,
          "X-Request-Host": host,
          "X-Request-Path": path,
        },
      });

      console.log(response);
      if (response.data.code === 200) {
        setMemberInfo(response.data.data);

        const accessToken = response.headers.Authorization;
        console.log("최종 엑세스 토큰", accessToken);

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
