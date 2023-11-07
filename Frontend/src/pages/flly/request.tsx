import React, { useEffect } from "react";
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
  deliveryAddressType
} from "@/recoil/fllyRecoil";
import Image from "next/image";
import { useRouter } from "next/router";
import DeliveryModal from "@/components/flly/fllyUser/DeliveryModal";
import PickupModal from "@/components/flly/fllyUser/PickupModal";
import CheckModal from "@/components/flly/fllyUser/CheckModal";
import axios from "axios";

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
  const [dateIdx, setDateIdx] = useState<number>(0);
  const [time, setTime] = useState<string>("")
  const [requestText, setRequestText] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [showDelieveryModal, setShowDelieveryModal] = useState<boolean>(false);
  const [showPickupModal, setShowPickupModal] = useState<boolean>(false);
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

  const handleBasicAddressUpdate = (newAddress:string) => {
    setBasicAddress(newAddress);
  }

  const handleDetailAddresUpdate = (newAddress:string) => {
    setDetailAddress(newAddress);
  }

  const deliveryModalHandler = () => {
    setShowDelieveryModal(!showDelieveryModal);
  }

  const pickupModalHandler = () => {
    setShowPickupModal(!showPickupModal);
  }
  
  const handleClickPrev = () => {
    setShowPrevModal(true);
  }

  const handleClickNext = () => {

    setShowNextModal(true);
  }


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
    
    if(idx == 0) {
      time.setFullYear(currentDate.getFullYear());
      time.setMonth(currentDate.getMonth());
      time.setDate(currentDate.getDate());
    } else if(idx == 1) {
      time.setFullYear(oneDayLater.getFullYear());
      time.setMonth(oneDayLater.getMonth());
      time.setDate(oneDayLater.getDate());
    } else if(idx == 2) {
      time.setFullYear(twoDaysLater.getFullYear());
      time.setMonth(twoDaysLater.getMonth());
      time.setDate(twoDaysLater.getDate());
    }

    setDateTime(time);
    setTime("");
  };

  const handleText = (e: any) => {
    setRequestText(e.target.value);
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);

    const timeParts = event.target.value.split(':');
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
        console.log(time);
      }
    }
  };

  const handleAdress = () => {
    if(checkDelivery) {
      setShowDelieveryModal(true);
    } else {
      setShowPickupModal(true);
    }
  };

  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const submitBtn = () => {
    if(checkDelivery && basicAddress==="") {
      
    } else if(!checkDelivery && pickupCodeList.length===0) {

    } else {
      if(price == undefined) {
      } else {
        if(time === "") {

        } else {
          axios
            .post(`https://flower-ly.co.kr/api/flly/request`, {
            // .post(`http://localhost:6090/api/flly/request`, {
              "situation" : situation == "선택 안함"? null : situation,
              "target" : target == "선택 안함"? null : target,
              "colors": colors.includes("선택 안함")? null : colors,
              "flowers": flowers,
              "orderType": checkDelivery? "DELIVERY": "PICKUP",
              "delivery": addressCode,
              "detailAddress": detailAddress,
              "pickup": pickupCodeList,
              "deadline": dateTime,
              "requestContent": requestText,
              "imageUrl": bouquet?.url,
              "budget": price,
            })
            .then((res) => {
              console.log(res.data);
              const data = res.data;
              if (data.code === 200) {
                // router.push("/");
              }
              else console.log("오류 발생");
            });
        }
      }
    }
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
  }, []);

  useEffect(() => {
    setDates([`${currentDate.getMonth()+1}.${currentDate.getDate()}`, `${oneDayLater.getMonth()+1}.${oneDayLater.getDate()}`, `${twoDaysLater.getMonth()+1}.${twoDaysLater.getDate()}`]);
  }, [currentDate, oneDayLater, twoDaysLater]);

  return (
    <>
      <div className={style.fllyBox}>
        {showDelieveryModal && 
        <DeliveryModal
          ModalChangeHandler={deliveryModalHandler}
          UpdateBasicAddress={handleBasicAddressUpdate}
          initialAddress={basicAddress}
          initialDetailAddress={detailAddress}
          UpdateDetailAddress={handleDetailAddresUpdate}
          setAddressCode={setAddressCode}
        />}
        {showPickupModal && 
        <PickupModal
          ModalChangeHandler={pickupModalHandler}
          pickupCodeList={pickupCodeList}
          setPickupCodeList={setPickupCodeList}
          pickupList={pickupList}
          setPickupList={setPickupList}
        />}
        {showPrevModal && 
        <CheckModal
          ModalChangeHandler={prevBtnHandler}
          question={"꽃다발 선택 페이지로 이동하시겠습니까?"}
          explain={"입력했던 정보는 모두 사라집니다."}
          routerHref={"flower"}
        />
        }
        {showNextModal && 
          <div className={styleModal.checkBack} onClick={nextBtnHandler}>
            <div className={styleModal.modalBack} onClick={NotClickEventHandler}>
              <div className={styleModal.question}>플리 의뢰서 작성을 완료하시겠습니까?</div>
              <div className={styleModal.explain}>페이지가 이동합니다.</div>
              <div className={styleModal.modalBtnBox}>
                <div onClick={nextBtnHandler}>취소</div>
                <div onClick={submitBtn}>확인</div>
              </div>
            </div>
          </div>
        }
        <div className={style.contentBox}>
          <div className={style.headerTitle}>
            <div className={style.guide}>플리 의뢰서</div>
          </div>
          <div className={style.imageBox}>
            <Image
              src={bouquet ? bouquet.url : "/img/homeBanner/121_pink_gomphrena.jpg"}
              alt="flower image"
              width={320}
              height={320}
            ></Image>
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
                  <span onClick={handleAdress} className={style.address}><Image src="/img/icon/search.png" alt="icon" height={16} width={16}/>&nbsp;주소 설정하기</span>
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
                <td>
                  {dates.map((item, index) => (
                    <span
                      key={index}
                      onClick={() => handleDate(index)}
                      className={index == dateIdx ? style.selectedBtn : style.nselectedBtn}
                    >
                      {item}
                    </span>
                  ))}
                  <input type="time" value={time} onChange={handleTimeChange} />
                </td>
              </tr>
              <tr>
                <th>
                  요청 사항
                  <br />
                  (150자)
                </th>
                <td><textarea maxLength={149} value={requestText} onChange={handleText}/><div className={style.textCount}>{requestText?.length}/150자</div></td>
              </tr>
            </table>
          </div>
          <div className={style.btnBox}>
            <div onClick={handleClickPrev} className={style.prevBtn}>&lt;</div>
            <div onClick={handleClickNext} className={style.nextBtn}>확인</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyTarget;
