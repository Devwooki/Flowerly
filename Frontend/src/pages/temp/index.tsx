import React from "react";
import { useRouter } from "next/router";

const Temp = () => {
  const { query } = useRouter();
  const accessToken = query.token;

  return <div>Temp</div>;
};

export default Temp;
