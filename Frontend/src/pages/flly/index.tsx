import React, { useState } from "react";

import FllySeller from "@/components/flly/fllySeller/FllySeller";
import FllySituation from "@/components/flly/fllyUser/FllySituation";

const FllyMain = () => {
  const [userType, setUserType] = useState<string>("buyer");

  return (
    <>{(userType !== "seller" && <FllySituation />) || (userType === "seller" && <FllySeller />)}</>

  );
};

export default FllyMain;
