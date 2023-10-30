import React, { useState, useEffect } from "react";
import style from "./style/ListSeller.module.css";
import ListAdoptCard from "./listSellerCardComponent/ListAdoptCard";

const ListSeller = () => {
  const [ListState, setListState] = useState<String>("adopt");

  const ChangeStatHander = () => {
    if (ListState === "adopt") {
      setListState("participation");
    } else {
      setListState("adopt");
    }
  };

  useEffect(() => {
    //엑시오스 요청 할예정
  }, [ListState]);

  return (
    <>
      <div className={style.ListSellerBack}>
        <div className={style.ListSellerHeader}>
          <div className={style.headerTitle}>진행중인 플리</div>
          <div className={style.headerSideBtn}>
            <div
              className={
                ListState === "adopt" ? style.headerSideBtnCheck : style.headerSideBtnUnchek
              }
              onClick={() => {
                ChangeStatHander();
              }}
            >
              채택된 플리
            </div>
            <div
              className={
                ListState === "participation" ? style.headerSideBtnCheck : style.headerSideBtnUnchek
              }
              onClick={() => {
                ChangeStatHander();
              }}
            >
              참여한 플리
            </div>
          </div>
        </div>
        <div className={style.ListSellerMain}>
          {ListState === "adopt" ? (
            <>
              <ListAdoptCard />
              <ListAdoptCard />
              <ListAdoptCard />
              <ListAdoptCard />
              <ListAdoptCard />
              <ListAdoptCard />
              <ListAdoptCard />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ListSeller;
