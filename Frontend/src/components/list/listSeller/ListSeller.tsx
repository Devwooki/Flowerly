import React, { useState, useEffect } from "react";
import style from "./style/ListSeller.module.css";
import ListAdoptCard from "./listSellerCardComponent/ListAdoptCard";
import ListParticipationCard from "./listSellerCardComponent/ListParticipationCard";
import ListAdoptCheckModal from "./listSellerCardComponent/ListAdoptCheckModal";

const ListSeller = () => {
  const [ListState, setListState] = useState<String>("adopt");
  //모달 상태
  const [modalState, setModalStest] = useState<Boolean>(false);
  //클릭한 아이템의 값

  const ChangeStatHander = () => {
    if (ListState === "adopt") {
      setListState("participation");
    } else {
      setListState("adopt");
    }
  };

  //모달의 상태 변경 함수
  const ModalChangeHandler = () => {
    setModalStest(!modalState);
  };

  useEffect(() => {
    //엑시오스 요청 할예정
  }, [ListState]);

  return (
    <>
      <div className={style.ListSellerBack}>
        {modalState && <ListAdoptCheckModal ModalChangeHandler={ModalChangeHandler} />}
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
              <ListAdoptCard ModalChangeHandler={ModalChangeHandler} />
              <ListAdoptCard ModalChangeHandler={ModalChangeHandler} />
              <ListAdoptCard ModalChangeHandler={ModalChangeHandler} />
              <ListAdoptCard ModalChangeHandler={ModalChangeHandler} />
              <ListAdoptCard ModalChangeHandler={ModalChangeHandler} />
              <ListAdoptCard ModalChangeHandler={ModalChangeHandler} />
              <ListAdoptCard ModalChangeHandler={ModalChangeHandler} />
            </>
          ) : (
            <ListParticipationCard />
          )}
        </div>
      </div>
    </>
  );
};

export default ListSeller;
