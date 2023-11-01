import { useParams } from "next/navigation";
import style from "./fllyId.module.css";
import FllyListMain from "@/components/list/listBuyer/fllylistComponent/fllyListMain";
import { useEffect } from "react";
import { useRouter } from "next/router";

const FllyList = () => {
  const router = useRouter();
  const { fllyId, card } = router.query;
  const parsedCard = JSON.parse(decodeURIComponent(card as string));

  console.log(fllyId);
  console.log(parsedCard);

  return (
    <div className={style.ListBuyerBack}>
      <div className={style.ListBuyerHeader}>
        <div className={style.headerTitle}>플리스트</div>
      </div>
      <div className={style.ListBuyerMain}>
        <FllyListMain />
      </div>
    </div>
  );
};

export default FllyList;
