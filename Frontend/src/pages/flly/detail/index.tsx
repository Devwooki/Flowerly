import React, { useState } from "react";

import FllySellerDetail from "@/components/flly/fllySeller/FllySellerDetail";

const FllyDetail = () => {
  const [userType, setUserType] = useState<string>("seller");
  return <>{userType === "seller" && <FllySellerDetail />}</>;
};

export default FllyDetail;
