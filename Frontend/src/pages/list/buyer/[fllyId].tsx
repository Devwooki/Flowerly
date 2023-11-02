import style from "./fllyId.module.css";
import FllyListMain from "@/components/list/listBuyer/fllylistComponent/FllyListMain";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { FllylistDiscRecoil } from "@/recoil/kdmRecoil";

const FllyList = () => {
  const getCardProps = useRecoilValue(FllylistDiscRecoil);
  const [sesstionCard, setSessionCard] = useState<BuyerCard>();

  useEffect(() => {
    setSessionCard(getCardProps);
  }, [getCardProps]);

  return (
    <div className={style.ListBuyerBack}>
      <div className={style.ListBuyerHeader}>
        <div className={style.headerTitle}>플리스트</div>
      </div>
      <div className={style.ListBuyerMain}>
        {sesstionCard && <FllyListMain card={sesstionCard} />}
      </div>
    </div>
  );
};

export default FllyList;
