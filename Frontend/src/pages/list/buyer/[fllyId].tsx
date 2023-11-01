import { useParams } from "next/navigation";
import style from "./fllyId.module.css";
import FllyListMain from "@/components/list/listBuyer/fllylistComponent/FllyListMain";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { fllylistDisc } from "@/recoil/kdmRecoil";
import { log } from "console";

const FllyList = () => {
  const getCardProps = useRecoilValue(fllylistDisc);

  return (
    <div className={style.ListBuyerBack}>
      <div className={style.ListBuyerHeader}>
        <div className={style.headerTitle}>플리스트</div>
      </div>
      <div className={style.ListBuyerMain}>
        <FllyListMain card={getCardProps} />
      </div>
    </div>
  );
};

export default FllyList;
