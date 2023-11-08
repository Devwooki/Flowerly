import React, { useState } from "react";
import SellerFllyListCompletedCard from "./SellerFllyListCard/SellerFllyListCompletedCard";
import SellerFllyListProgressCard from "./SellerFllyListCard/SellerFllyListProgressCard";

const SellerFllyList = () => {
  return (
    <>
      <div className="SellerFllyListBack">
        <SellerFllyListCompletedCard />
        <SellerFllyListProgressCard />
      </div>
    </>
  );
};

export default SellerFllyList;
