import React, { useState, useEffect } from "react";
import style from "./style/ListSeller.module.css";
import ListAdoptCard from "./listSellerCardComponent/ListAdoptCard";
import ListParticipationCard from "./listSellerCardComponent/ListParticipationCard";
import ListAdoptCheckModal from "./listSellerCardComponent/ListAdoptCheckModal";
import { tokenHttp } from "@/api/tokenHttp";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

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
  fllyFlower1: string | null;
  fllyFlower2: string | null;
  fllyFlower3: string | null;
  fllybudget: number;
  fllyDeadline: string;
  fllyResponeDto: fllyResponeDtoType;
  fllyProgress: string;
}

const ListSeller = () => {
  //페이징
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  //클릭 리스트 상태
  const [ListState, setListState] = useState<String>("adopt");
  //모달 상태
  const [modalState, setModalStest] = useState<Boolean>(false);
  //클릭한 아이템의 값
  const [selectId, setSelectId] = useState<number>(-1);
  const [clickIndex, setClickIndex] = useState<number>(0);

  const [adoptData, setAdoptData] = useState<adoptType[]>([]);
  const [participationData, setParticipationData] = useState<participationType[]>([]);

  const [lastref, inView] = useInView();

  const router = useRouter();

  //상단 Side 클릭에 따른 세팅 핸들러
  const ChangeStatHander = (clickName: string) => {
    if (ListState !== clickName && clickName === "participation") {
      setCurrentPage(0);
      setAdoptData([]);
      setListState("participation");
    } else if (ListState !== clickName && clickName === "adopt") {
      setCurrentPage(0);
      setParticipationData([]);
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
        const reData = res.data;
        if (reData.code === 200) {
          setTotalPage(reData.data.totalPages);
          setCurrentPage((parent) => parent + 1);
          if (ListState === "adopt") {
            setAdoptData((parent) => [...parent, ...reData.data.content]);
          } else {
            setParticipationData((parent) => [...parent, ...reData.data.content]);
          }
        }
        if (res.headers.authorization) {
          localStorage.setItem("accessToken", res.headers.authorization);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
        }
      });
  };

  useEffect(() => {
    setParticipationData([]);
    setAdoptData([]);
    setCurrentPage(0);
    setTotalPage(0);
    //엑시오스 요청 할예정
    if (ListState === "adopt") {
      axiosHandler("order");
    } else {
      axiosHandler("flly/seller");
    }
    /* eslint-disable-next-line */
  }, [ListState]);

  /*무한 스크롤을 볼경우*/
  useEffect(() => {
    if (totalPage !== 0) {
      if (ListState === "adopt") {
        axiosHandler("order");
      } else {
        axiosHandler("flly/seller");
      }
    }
    /* eslint-disable-next-line */
  }, [inView]);

  return (
    <>
      <div className={style.ListSellerBack}>
        {modalState && (
          <ListAdoptCheckModal
            ModalChangeHandler={ModalChangeHandler}
            $selectId={selectId}
            UpdateAdptList={UpdateAdptList}
            $Info={adoptData[clickIndex]}
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
              {adoptData.length > 0 ? (
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
                <div className={style.noListBox}>
                  <div>
                    <Image
                      src={"/img/etc/no-selection-image.png"}
                      width={200}
                      height={200}
                      alt="플리가 없습니다"
                    ></Image>
                    <div>채택된 플리가 없습니다</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {participationData.length > 0 ? (
                participationData.map((value, index) => (
                  <ListParticipationCard key={value.fllyId + index} $participationInfo={value} />
                ))
              ) : (
                <div className={style.noListBox}>
                  <div>
                    <Image
                      src={"/img/etc/no-participation-image.png"}
                      width={200}
                      height={200}
                      alt="플리가 없습니다"
                    ></Image>
                    <div>참여한 플리가 없습니다</div>
                  </div>
                </div>
              )}
            </>
          )}
          {
            /* 무한 스크롤 을 위한 viw 체크 */
            currentPage < totalPage && <div ref={lastref}></div>
          }
        </div>
      </div>
    </>
  );
};

export default ListSeller;
