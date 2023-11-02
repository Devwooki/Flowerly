import React, { useState } from "react";

import FllySellerParticipation from "@/components/flly/fllySeller/FllySellerParticipation";

const FllyCreate = () => {
  const [userType, setUserType] = useState<string>("seller");

  return <>{userType === "seller" && <FllySellerParticipation />}</>;
};

export default FllyCreate;
