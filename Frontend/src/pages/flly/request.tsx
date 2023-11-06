import React, { useEffect } from "react";
import style from "@/components/flly/fllyUser/FllyRequest.module.css";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  situationState,
  targetState,
  colorState,
  flowerState,
  bouquetState,
} from "@/recoil/fllyRecoil";
import Image from "next/image";
import { useRouter } from "next/router";

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
  // const dates = ["11.17", "11.18", "11.19"];
  const [dates, setDates] = useState([] as string[]);
  const [dateIdx, setDateIdx] = useState<number>(0);
  const [time, setTime] = useState<string>("")
  const [requestText, setRequestText] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date>(new Date());
  
  // 날짜와 시간 합치기

  const handlePrevClick = () => {};

  const handleNextClick = () => {};

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
        <div className={style.contentBox}>
          <div className={style.headerTitle}>
            <div className={style.guide}>플리 의뢰서</div>
          </div>
          <Image
            src={bouquet ? bouquet.url : ""}
            alt="flower image"
            width={200}
            height={200}
          ></Image>
          <div className={style.requestArea}>
            <div className={style.guide}>의뢰 내용</div>
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
                  <span className={style.address}>주소 검색하기</span>
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
            <div onClick={handlePrevClick} className={style.prevBtn}>
              &lt;
            </div>
            <div onClick={handleNextClick} className={style.nextBtn}>
              확인
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyTarget;
