import { log } from "console";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const ShopInfoMain = () => {
  const router = useRouter();

  console.log(router.query);

  return <div>꼬까게다 임마</div>;
};

export default ShopInfoMain;
