import React, { useEffect, useRef } from "react";
import style from "@/components/flly/fllyUser/FllyRequest.module.css";
import styleModal from "@/components/flly/fllyUser/CheckModal.module.css";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  situationState,
  targetState,
  colorState,
  flowerState,
  bouquetState,
  regionState,
  regionType,
  deliveryAddressType,
} from "@/recoil/fllyRecoil";
import Image from "next/image";
import { useRouter } from "next/router";
import DeliveryModal from "@/components/flly/fllyUser/DeliveryModal";
import PickupModal from "@/components/flly/fllyUser/PickupModal";
import CheckModal from "@/components/flly/fllyUser/CheckModal";
import axios from "axios";
import { ToastErrorMessage, ToastSuccessMessage } from "@/model/toastMessageJHM";
import { tokenHttp } from "@/api/tokenHttp";
import TimeSetModal from "@/components/flly/fllyUser/TimeSetModal";
import { url } from "inspector";
import LoadingModal from "@/components/flly/fllySeller/LoadingModal";

const FllyTarget = () => {
  const router = useRouter();
  const situation = useRecoilValue(situationState);
  const target = useRecoilValue(targetState);
  const colors = useRecoilValue(colorState);
  const flowers = useRecoilValue(flowerState);
  const bouquet = useRecoilValue(bouquetState);
  const [checkDelivery, setCheckDelivery] = useState<boolean>(true);
  const [price, setPrice] = useState<number>();
  const colorNames = ["RED", "ORANGE", "PINK", "YELLOW", "BLUE", "PURPLE", "WHITE", "선택 안함"];
  const colorKorean = ["빨강", "주황", "분홍", "노랑", "파랑", "보라", "흰색", "선택 안함"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [oneDayLater, setOneDayLater] = useState(new Date());
  const [twoDaysLater, setTwoDaysLater] = useState(new Date());
  const [dates, setDates] = useState([] as string[]);
  const [dateIdx, setDateIdx] = useState<number>();
  const [time, setTime] = useState<string>("");
  const [requestText, setRequestText] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [showDelieveryModal, setShowDelieveryModal] = useState<boolean>(false);
  const [showPickupModal, setShowPickupModal] = useState<boolean>(false);
  const [showTimeSetModal, setShowTimeSetModal] = useState<boolean>(false);
  const [basicAddress, setBasicAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [addressCode, setAddressCode] = useState<deliveryAddressType>({
    sido: "",
    sigungu: "",
    dong: "",
  });
  const [pickupList, setPickupList] = useState<string[]>([]);
  const [pickupCodeList, setPickupCodeList] = useRecoilState<regionType[]>(regionState);
  const [showPrevModal, setShowPrevModal] = useState<boolean>(false);
  const [showNextModal, setShowNextModal] = useState<boolean>(false);
  const imgBoxRef = useRef<HTMLDivElement>(null);

  const [checkSubmitted, setCheckSubmitted] = useState<boolean>(false);
  const [loadingModalState, setLoadingModalState] = useState<boolean>(false);

  const handleBasicAddressUpdate = (newAddress: string) => {
    setBasicAddress(newAddress);
  };

  const handleDetailAddresUpdate = (newAddress: string) => {
    setDetailAddress(newAddress);
  };

  const timeSetModalHandler = () => {
    setShowTimeSetModal(!showTimeSetModal);
  };

  const deliveryModalHandler = () => {
    setShowDelieveryModal(!showDelieveryModal);
  };

  const pickupModalHandler = () => {
    setShowPickupModal(!showPickupModal);
  };

  const handleClickPrev = () => {
    if (checkSubmitted === false) setShowPrevModal(true);
  };

  const handleClickNext = () => {
    if (checkDelivery && basicAddress === "") {
      ToastErrorMessage("주소를 입력해 주세요.");
    } else if (!checkDelivery && pickupCodeList.length === 0) {
      ToastErrorMessage("주소를 입력해 주세요.");
    } else {
      if (price == undefined) ToastErrorMessage("가격을 입력해 주세요.");
      else {
        if (time === "") {
          ToastErrorMessage("시간을 입력해 주세요.");
        } else {
          setShowNextModal(true);
        }
      }
    }
  };

  const prevBtnHandler = () => {
    setShowPrevModal(!showPrevModal);
  };

  const nextBtnHandler = () => {
    setShowNextModal(!showNextModal);
  };

  const handleDelivery = () => {
    setCheckDelivery(true);
  };

  const handlePickup = () => {
    setCheckDelivery(false);
  };

  const handlePrice = (e: any) => {
    setPrice(e.target.value);
  };

  const handleDate = (idx: number) => {
    setDateIdx(idx);
    const time = new Date();

    if (idx == 0) {
      time.setFullYear(currentDate.getFullYear());
      time.setMonth(currentDate.getMonth());
      time.setDate(currentDate.getDate());
    } else if (idx == 1) {
      time.setFullYear(oneDayLater.getFullYear());
      time.setMonth(oneDayLater.getMonth());
      time.setDate(oneDayLater.getDate());
    } else if (idx == 2) {
      time.setFullYear(twoDaysLater.getFullYear());
      time.setMonth(twoDaysLater.getMonth());
      time.setDate(twoDaysLater.getDate());
    }

    setDateTime(time);
    setTime("");
  };

  const handleText = (e: any) => {
    setRequestText(e.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);

    const timeParts = event.target.value.split(":");
    if (timeParts.length === 2) {
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const time = new Date();
        time.setFullYear(dateTime.getFullYear());
        time.setMonth(dateTime.getMonth());
        time.setDate(dateTime.getDate());
        time.setHours(hours);
        time.setMinutes(minutes);
        setDateTime(time);
      }
    }
  };

  const handleAdress = () => {
    if (checkDelivery) {
      setShowDelieveryModal(true);
    } else {
      setShowPickupModal(true);
    }
  };

  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const submitBtn = () => {
    if (checkSubmitted === false) {
      setCheckSubmitted(true);
      setShowNextModal(false);
      setLoadingModalState(true);
      // ToastSuccessMessage("의뢰서를 저장 중입니다.");
      tokenHttp
        .post(`/flly/request`, {
          situation: situation == "선택 안함" ? null : situation,
          target: target == "선택 안함" ? null : target,
          colors: colors.includes("선택 안함") ? null : colors,
          flowers: flowers,
          orderType: checkDelivery ? "DELIVERY" : "PICKUP",
          delivery: addressCode,
          detailAddress: detailAddress,
          pickup: pickupCodeList,
          deadline: dateTime,
          requestContent: requestText,
          imageUrl: bouquet?.url,
          budget: price,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            if (response.headers.authorization)
              localStorage.setItem("accessToken", response.headers.authorization);
            router.push("/list");
            setLoadingModalState(false);
          } else setCheckSubmitted(false);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            router.push("/fllylogin");
          } else {
            setCheckSubmitted(false);
            setLoadingModalState(false);
            ToastErrorMessage("오류가 발생했습니다.");
          }
        });
    } else ToastErrorMessage("의뢰서를 저장하고 있습니다.");
  };

  useEffect(() => {
    const currentDate = new Date();
    setCurrentDate(currentDate);
    const oneDayLater = new Date(currentDate);
    oneDayLater.setDate(currentDate.getDate() + 1);
    setOneDayLater(oneDayLater);
    const twoDaysLater = new Date(currentDate);
    twoDaysLater.setDate(currentDate.getDate() + 2);
    setTwoDaysLater(twoDaysLater);

    if (imgBoxRef.current) {
      imgBoxRef.current.style.height = imgBoxRef.current.offsetWidth + "px";
    }
  }, []);

  useEffect(() => {
    console.log("픽업리스트", pickupList);
  }, [pickupList]);

  useEffect(() => {
    setDates([
      `${currentDate.getMonth() + 1} 월 ${currentDate.getDate()} 일`,
      `${oneDayLater.getMonth() + 1} 월 ${oneDayLater.getDate()} 일`,
      `${twoDaysLater.getMonth() + 1} 월 ${twoDaysLater.getDate()} 일`,
    ]);
  }, [currentDate, oneDayLater, twoDaysLater]);

  return (
    <>
      <div className={style.fllyBox}>
        {loadingModalState && <LoadingModal statetext={"플리 생성중"} />}
        {showTimeSetModal && (
          <TimeSetModal
            $dateIdx={dateIdx}
            $dates={dates}
            $time={time}
            handleTimeChange={handleTimeChange}
            ModalChangeHandler={timeSetModalHandler}
            handleDate={handleDate}
          />
        )}
        {showDelieveryModal && (
          <DeliveryModal
            ModalChangeHandler={deliveryModalHandler}
            UpdateBasicAddress={handleBasicAddressUpdate}
            initialAddress={basicAddress}
            initialDetailAddress={detailAddress}
            UpdateDetailAddress={handleDetailAddresUpdate}
            setAddressCode={setAddressCode}
          />
        )}
        {showPickupModal && (
          <PickupModal
            ModalChangeHandler={pickupModalHandler}
            pickupCodeList={pickupCodeList}
            setPickupCodeList={setPickupCodeList}
            pickupList={pickupList}
            setPickupList={setPickupList}
          />
        )}
        {showPrevModal && (
          <CheckModal
            ModalChangeHandler={prevBtnHandler}
            question={"꽃다발 선택 페이지로 이동하시겠습니까?"}
            explain={"입력했던 정보는 모두 사라집니다."}
            routerHref={"flower"}
          />
        )}
        {showNextModal && (
          <div className={styleModal.checkBack} onClick={nextBtnHandler}>
            <div className={styleModal.modalBack} onClick={NotClickEventHandler}>
              <div className={styleModal.question}>플리 의뢰서 작성을 완료하시겠습니까?</div>
              <div className={styleModal.explain}>페이지가 이동합니다.</div>
              <div className={styleModal.modalBtnBox}>
                <div onClick={nextBtnHandler}>취소</div>
                <div className={checkSubmitted ? styleModal.noSelect : ""} onClick={submitBtn}>
                  확인
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={style.contentBox}>
          <div className={style.headerTitle}>
            <div className={style.guide}>플리 의뢰서</div>
          </div>
          <div
            className={style.imageBox}
            ref={imgBoxRef}
            style={{ backgroundImage: `url(${bouquet ? bouquet.url : "/img/etc/loading.gif"})` }}
          >
            {/* <Image src={bouquet ? bouquet.url : ""} alt="flower image" fill></Image> */}
          </div>
          <div className={style.requestArea}>
            {/* <div className={style.guide}>의뢰 내용</div> */}
            <table className={style.requestTable}>
              <tr>
                <th>이벤트 상황</th>
                <td>{situation}</td>
              </tr>
              <tr>
                <th>이벤트 대상</th>
                <td>{target}</td>
              </tr>
              <tr>
                <th>색상</th>
                <td>
                  <ul>
                    {colors.map((item, index) => (
                      <li key={index} className={style.colorLi}>
                        {colorKorean[colorNames.indexOf(item)]}&nbsp;
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <th>선택한 꽃</th>
                <td>
                  <ul>
                    {flowers.map((item, index) => (
                      <li key={index}>
                        {item.flowerName}&nbsp;-&nbsp;{item.meaning}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </table>
            <div className={style.line}></div>
            <table className={`${style.requestTable} ${style.second}`}>
              <tr>
                <th>주문유형</th>
                <td>
                  <span
                    onClick={handleDelivery}
                    className={checkDelivery ? style.selectedBtn : style.nselectedBtn}
                  >
                    배달
                  </span>
                  <span
                    onClick={handlePickup}
                    className={checkDelivery ? style.nselectedBtn : style.selectedBtn}
                  >
                    픽업
                  </span>
                </td>
              </tr>
              <tr>
                <th>주소</th>
                <td>
                  <div onClick={handleAdress} className={style.address}>
                    <Image src="/img/icon/search.png" alt="icon" height={16} width={16} />
                    &nbsp;{" "}
                    {checkDelivery ? (
                      basicAddress && detailAddress ? (
                        <div className={style.addressAndDelivery}>
                          {basicAddress + detailAddress}
                        </div>
                      ) : (
                        <div>배달 주소 설정하기</div>
                      )
                    ) : pickupList.length > 0 ? (
                      <div>
                        {pickupList.map((value, index) => (
                          <>
                            <span key={value + index}>
                              {index != 0 && ", "}
                              {value}
                            </span>
                          </>
                        ))}
                      </div>
                    ) : (
                      <div>픽업 가능 지역 설정하기</div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <th>예산</th>
                <td>
                  <input
                    className={style.price}
                    type="number"
                    placeholder="가격"
                    value={price}
                    onChange={handlePrice}
                  ></input>
                  원
                </td>
              </tr>
              <tr>
                <th>마감 시간</th>
                <td className={style.ManyInfoTd}>
                  {dateIdx && time ? (
                    <div
                      className={style.fllyTimeSet}
                      onClick={() => {
                        timeSetModalHandler();
                      }}
                    >
                      {dateTime.getMonth() + 1} 월 {dateTime.getDate()} 일 {dateTime.getHours()} 시{" "}
                      {dateTime.getMinutes()} 분{" "}
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        timeSetModalHandler();
                      }}
                      className={style.fllyTimeSet}
                    >
                      플리 마감시간 설정하기
                    </div>
                  )}
                  <div className={style.fllyTimeInfoText}>해당 시간까지 플리가 등장해요!</div>
                  {/* {dates.map((item, index) => (
                    <span
                      key={index}
                      onClick={() => handleDate(index)}
                      className={index == dateIdx ? style.selectedBtn : style.nselectedBtn}
                    >
                      {item}
                    </span>
                  ))} */}
                  {/* <input type="time" value={time} onChange={handleTimeChange} /> */}
                </td>
              </tr>
              <tr>
                <th>
                  <div className={style.ManyInfoth}>
                    <div>요청 사항</div>
                    <div>(150자)</div>
                  </div>
                </th>
                <td className={style.ManyInfoTd}>
                  <textarea maxLength={149} value={requestText} onChange={handleText} />
                  <div className={style.textCount}>{requestText?.length}/150자</div>
                </td>
              </tr>
            </table>
          </div>
          <div className={style.btnBox}>
            <div onClick={handleClickPrev} className={style.prevBtn}>
              &lt;
            </div>
            <div onClick={handleClickNext} className={style.nextBtn}>
              확인
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyTarget;
