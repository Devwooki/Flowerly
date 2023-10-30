import React, { useState } from "react";

import FllySeller from "@/components/flly/fllySeller/FllySeller";
import FllySituation from "@/components/flly/fllyUser/FllySituation"
import FllyTarget from "@/components/flly/fllyUser/FllyTarget"
import FllyCollor from "@/components/flly/fllyUser/FllyColor"

const FllyMain = () => {
  const [userType, setUserType] = useState<string>("user");

  return <>{userType === "seller" && <FllySeller /> || userType !== "seller" && <FllyCollor />}</>;
};

export default FllyMain;
