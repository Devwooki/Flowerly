import { log } from "console";
import style from "./ProgressBar.module.css";
import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const [barWidth, setBarWidth] = useState("0");

  useEffect(() => {
    const stepWidths = ["0", "20%", "40%", "65%", "100%"];
    setBarWidth(stepWidths[currentStep]);
  }, [currentStep]);

  return (
    <div className={style.main}>
      <ul className={`${style.step}`}>
        <div
          style={{ width: barWidth }}
          className={style.progressBar} // 이 클래스 이름은 추가해야 합니다.
        />
        {[0, 1, 2, 3, 4].map((index) => (
          <li key={index} className={currentStep >= index ? style.active : ""}>
            <span></span>
          </li>
        ))}
      </ul>
      <div className={style.text}>
        <div>입찰</div>
        <div>조율</div>
        <div>주문완료</div>
        <div>제작완료</div>
        <div>픽업/배달완료</div>
      </div>
    </div>
  );
};

export default ProgressBar;
