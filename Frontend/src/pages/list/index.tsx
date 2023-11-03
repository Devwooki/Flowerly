import React, { useState } from "react";

import ListSeller from "@/components/list/listSeller/ListSeller";
import ListBuyer from "@/components/list/listBuyer/ListBuyer";
const FllyList = () => {
  // const [userType, setUserType] = useState<string>("seller");
<<<<<<< Updated upstream
  const [userType, setUserType] = useState<string>("seller");
=======
  const [userType, setUserType] = useState<string>("buyer");
>>>>>>> Stashed changes

  return <>{userType === "seller" ? <ListSeller /> : <ListBuyer />}</>;
};

export default FllyList;
