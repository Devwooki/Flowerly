import React, { useState } from "react";

import ListSeller from "@/components/list/listSeller/ListSeller";

const FllyList = () => {
  const [userType, setUserType] = useState<string>("seller");

  return <>{userType === "seller" && <ListSeller />}</>;
};

export default FllyList;
