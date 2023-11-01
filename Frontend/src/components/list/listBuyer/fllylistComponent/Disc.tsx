import { log } from "console";
import React from "react";

type DiscProps = {
  card: BuyerCard;
};

const Disc = ({ card }: DiscProps) => {
  console.log("disc", card);

  return (
    <>
      <div>{card.fllyId}</div>
      <div>{card.state}</div>
      <div>{card.img}</div>
      <div>{card.situation}</div>
      <div>{card.target}</div>
    </>
  );
};

export default Disc;
