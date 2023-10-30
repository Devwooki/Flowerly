import React, { useState } from "react";

import FllySeller from "@/components/flly/fllySeller/FllySeller";
import FllySituation from "@/components/flly/fllyUser/FllySituation"

const FllyMain = () => {
  const [userType, setUserType] = useState<string>("user");

  return <>{userType === "seller" && <FllySeller /> || userType !== "seller" && <FllySituation />}</>;
};

export default FllyMain;
