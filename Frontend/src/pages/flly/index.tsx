import React, { useState } from "react";

import FllySeller from "@/components/flly/fllySeller/FllySeller";
import FllySituation from "@/components/flly/fllyUser/FllySituation";
<<<<<<< Updated upstream

const FllyMain = () => {
  const [userType, setUserType] = useState<string>("buyer");

  return (
    <>{(userType !== "seller" && <FllySituation />) || (userType === "seller" && <FllySeller />)}</>
=======
import FllyTarget from "@/components/flly/fllyUser/FllyTarget";
import FllyCollor from "@/components/flly/fllyUser/FllyColor";
import FllyFlower from "@/components/flly/fllyUser/FllyFlower";
import FllyLoading from "@/components/flly/fllyUser/FllyLoading";
import FllyBouquet from "@/components/flly/fllyUser/FllyBouquet";
const FllyMain = () => {
  const [userType, setUserType] = useState<string>("seller");

  return (
    <>{(userType !== "seller" && <FllyBouquet />) || (userType === "seller" && <FllySeller />)}</>
>>>>>>> Stashed changes
  );
};

export default FllyMain;
