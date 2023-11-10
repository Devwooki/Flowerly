import React, { useState, useEffect } from "react";
import style from "./style/ListSeller.module.css";
import ListAdoptCard from "./listSellerCardComponent/ListAdoptCard";
import ListParticipationCard from "./listSellerCardComponent/ListParticipationCard";
import ListAdoptCheckModal from "./listSellerCardComponent/ListAdoptCheckModal";
import { ToastErrorMessage } from "@/model/toastMessageJHM";
import { tokenHttp } from "@/api/tokenHttp";
import { useRouter } from "next/router";
import { error } from "console";

interface adoptType {
  requestId: number;
  orderName: string;
  phoneNumber: string;
  orderType: string;
  deliveryPickupTime: string;
  fllyId: number;
  progress: string;
  imageUrl: string;
}

interface fllyResponeDtoType {
  fllyParticipationId: number;
  requestImageUrl: string;
  requestPrice: number;
  content: string;
}

interface participationType {
  fllyId: number;
  fllyImageUrl: string;
  fllyFlower1: string;
  fllyFlower2: string;
  fllyFlower3: string;
  fllybudget: number;
  fllyDeadline: string;
  fllyResponeDto: fllyResponeDtoType;
}

const ListSeller = () => {
  //페이징
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>();
  //클릭 리스트 상태
  const [ListState, setListState] = useState<String>("adopt");
  //모달 상태
  const [modalState, setModalStest] = useState<Boolean>(false);
  //클릭한 아이템의 값
  const [selectId, setSelectId] = useState<number>(-1);
  const [clickIndex, setClickIndex] = useState<number>(0);

  const [adoptData, setAdoptData] = useState<adoptType[]>([]);
  const [participationData, setParticipationData] = useState<participationType[]>([]);

  const router = useRouter();

  //상단 Side 클릭에 따른 세팅 핸들러
  const ChangeStatHander = (clickName: string) => {
    if (ListState !== clickName && clickName === "participation") {
      setCurrentPage(0);
      setListState("participation");
    } else if (ListState !== clickName && clickName === "adopt") {
      setCurrentPage(0);
      setListState("adopt");
    } else null;
  };

  //선택한 flly 세팅을 위한 핸들러
  const SelectIdChangeHandler = (fllyId: number, index: number) => {
    setSelectId(fllyId);
    setClickIndex(index);
  };

  //모달의 상태 변경 핸들러
  const ModalChangeHandler = () => {
    setModalStest(!modalState);
  };

  //모달 완료하기 클릭으로 인한 Progress 변경 핸들러
  const UpdateAdptList = (fllyUpdateProgress: string) => {
    const updatedAdoptData = [...adoptData];

    //clickIndex값이 유효하다면 변경해준다
    if (clickIndex >= 0 && clickIndex < updatedAdoptData.length) {
      updatedAdoptData[clickIndex].progress = fllyUpdateProgress;
      setAdoptData(updatedAdoptData);
    }
  };

  const axiosHandler = (addUrl: string) => {
    tokenHttp
      .get("/seller/" + addUrl + "?page=" + currentPage)
      .then((res) => {
        console.log(res);
        const reData = res.data;
        if (reData.code === 200) {
          console.log(reData.data.content);
          setTotalPage(reData.data.totalPages);
          if (ListState === "adopt") setAdoptData(reData.data.content);
          else setParticipationData(reData.data.content);
        } else {
          ToastErrorMessage(reData.message);
        }
        if (res.headers.authorization) {
          localStorage.setItem("accessToken", res.headers.authorization);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
          ToastErrorMessage("로그인 만료되어 로그인화면으로 이동합니다.");
        }
      });
  };

  useEffect(() => {
    //엑시오스 요청 할예정
    if (ListState === "adopt") {
      setParticipationData([]);
      axiosHandler("order");
    } else {
      setAdoptData([]);
      axiosHandler("flly/seller");
    }
  }, [ListState]);

  return (
    <>
      <div className={style.ListSellerBack}>
        {modalState && (
          <ListAdoptCheckModal
            ModalChangeHandler={ModalChangeHandler}
            $selectId={selectId}
            UpdateAdptList={UpdateAdptList}
          />
        )}
        <div className={style.ListSellerHeader}>
          <div className={style.headerTitle}>진행중인 플리</div>
          <div className={style.headerSideBtn}>
            <div
              className={
                ListState === "adopt" ? style.headerSideBtnCheck : style.headerSideBtnUnchek
              }
              onClick={() => {
                ChangeStatHander("adopt");
              }}
            >
              채택된 플리
            </div>
            <div
              className={
                ListState === "participation" ? style.headerSideBtnCheck : style.headerSideBtnUnchek
              }
              onClick={() => {
                ChangeStatHander("participation");
              }}
            >
              참여한 플리
            </div>
          </div>
        </div>
        <div className={style.ListSellerMain}>
          {ListState === "adopt" ? (
            <>
              {adoptData.map((value, index) => (
                <ListAdoptCard
                  ModalChangeHandler={ModalChangeHandler}
                  SelectIdChangeHandler={SelectIdChangeHandler}
                  $adoptInfo={value}
                  key={value.fllyId + index}
                  $index={index}
                />
              ))}
            </>
          ) : (
            <>
              {participationData.map((value, index) => (
                <ListParticipationCard key={value.fllyId + index} $participationInfo={value} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListSeller;
