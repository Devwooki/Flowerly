import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function FirstPage() {
  const route = useRouter();

  useEffect(() => {
    //step1. 토큰 검사 로직을 여기에 추가
    //       예: 토큰이 유효하면 홈 페이지로 이동, 토큰이 없으면 회원 가입 페이지로 이동
    console.log(localStorage.getItem("accessToken"));
    //step2.
    if (localStorage.getItem("accessToken")) {
      route.push("/home"); // 유효한 경우 홈 페이지로 리디렉션
    } else {
      route.push("/fllylogin"); // 유효하지 않은 경우 회원 가입 페이지로 리디렉션
    }
    /* eslint-disable-next-line */
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return null;
}
