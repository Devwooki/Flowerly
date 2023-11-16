import React, { useRef, useState } from "react";
import style from "./TimeSetModal.module.css";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

interface Props {
  ModalChangeHandler: () => void;
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  $time: string;
  $dates: string[];
  $dateIdx: number | undefined;
  handleDate: (index: number) => void;
}

const TimeSetModal = ({
  ModalChangeHandler,
  handleTimeChange,
  $time,
  $dates,
  $dateIdx,
  handleDate,
}: Props) => {
  //   const [selectDateIndex, setSelectDateIndex] = useState<number>();
  const inputTime = useRef<HTMLInputElement>(null);

  const dateBtnClickHandler = (index: number) => {
    console.log("날자 클릭 핸들러", index);
    // setSelectDateIndex(index);
  };

  const submitHandler = () => {
    if (!$dateIdx) {
      ToastErrorMessage("마감 날짜를 설정해주세요!");
      return;
    }

    if (!$time) {
      ToastErrorMessage("마감 시간을 설정해주세요!");
      return;
    }
    ModalChangeHandler();
  };

  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    //상위 함수를 실행하지 말아라 (모달 꺼지는거 방지)
    e.stopPropagation();
  };

  return (
    <div className={style.modalBack} onClick={ModalChangeHandler}>
      <div className={style.modalBox} onClick={NotClickEventHandler}>
        <div className={style.modalMain}>
          <div className={style.titleBox}>
            <div>플리 마감 시간 설정</div>
            <div>최대 3일</div>
          </div>
          <div className={style.titleSideText}>해당 시간까지 플리에 꽃집이 참여 가능합니다!</div>

          <div className={style.dateBox}>
            <div className={style.boxTitle}>날짜</div>
            <div className={style.dataBtnBox}>
              {$dates.map((value, index) => (
                <div
                  key={index}
                  className={$dateIdx === index ? style.clickActive : ""}
                  onClick={() => {
                    dateBtnClickHandler(index);
                    handleDate(index);
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>

          <div className={style.timeBox}>
            <div className={style.boxTitle}>시간</div>
            <input ref={inputTime} type="time" value={$time} onChange={handleTimeChange} />
            {/* <div className={style.timeSetBox} onClick={timeSetClickHandler}>
              <div className={style.selectTimeBox}>18</div>
              <div>시</div>
              <div className={style.selectTimeBox}>00</div>
              <div>분</div>
            </div> */}
          </div>
          <div
            className={style.submitBtn}
            onClick={() => {
              submitHandler();
            }}
          >
            {" "}
            설정 하기{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSetModal;
