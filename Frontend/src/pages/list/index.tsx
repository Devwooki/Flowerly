import React, { useState } from "react";

import ListSeller from "@/components/list/listSeller/ListSeller";
import ListBuyer from "@/components/list/listBuyer/ListBuyer";
import { useRecoilValue } from "recoil";
import { MemberInfo, memberInfoState } from "@/recoil/memberInfoRecoil";
import Head from "next/head";
const FllyList = () => {
  const memberInfo = useRecoilValue<MemberInfo>(memberInfoState);
  return (
    <>
      <Head>
        <title>플리스트</title>
        <meta property="og:title" content={`진행중인 플리를 확인하세요`} />
      </Head>
      {memberInfo.role === "SELLER" ? <ListSeller /> : <ListBuyer />}
    </>
  );
};

export default FllyList;
