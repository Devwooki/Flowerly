import React, { useState, useEffect } from "react";
import style from "./ListBuyer.module.css";

const ListBuyer = () => {
  return (
    <div className={style.ListBuyerBack}>
      <div className={style.ListBuyerHeader}>
        <div className={style.headerTitle}>진행중인 플리</div>
      </div>
      <div className={style.ListBuyerMain}></div>
    </div>
  );
};

export default ListBuyer;
