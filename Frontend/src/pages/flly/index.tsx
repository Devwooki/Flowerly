import React, { useState } from "react";

import FllySeller from "@/components/flly/fllySeller/FllySeller";
import FllySituation from "@/components/flly/fllyUser/FllySituation";
import { useRecoilValue } from "recoil";
import { MemberInfo, memberInfoState } from "@/recoil/memberInfoRecoil";

const FllyMain = () => {
  const memberInfo = useRecoilValue<MemberInfo>(memberInfoState);
  return (
    <>
      {(memberInfo.role !== "SELLER" && <FllySituation />) ||
        (memberInfo.role === "SELLER" && <FllySeller />)}
    </>
  );
};

export default FllyMain;
