import React, { useState } from "react";

import FllySeller from "@/components/flly/fllySeller/FllySeller";

const FllyMain = () => {
  const [userType, setUserType] = useState<string>("seller");

  return <>{userType === "seller" && <FllySeller />}</>;
};

export default FllyMain;
