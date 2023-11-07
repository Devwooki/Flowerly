import React, { useEffect, useState } from "react";
import style from "./BuyerFllyListProgressBar.module.css";

interface ProgressBarProps {
  currentStep: number;
}
const BuyerFllyListProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const [barWidth, setBarWidth] = useState("0");

  useEffect(() => {
    const stepWidths = ["0", "20%", "40%", "60%", "100%"];
    setBarWidth(stepWidths[currentStep]);
  }, [currentStep]);

  const coloroSelect = (step: number, divStep: number) => {
    if (step < divStep) {
      return "var(--sky)";
    }
    if (step === divStep) {
      return "var(--blue)";
    }
    if (step > divStep) {
      return "var(--moregray)";
    }
  };

  const spanBorderColor = (step: number, divStep: number) => {
    if (step <= divStep) {
      return "var(--sky)";
    }
  };

  return (
    <div className={style.main}>
      <ul className={`${style.step}`}>
        <div className={style.progressBarBefore} />
        <div style={{ width: barWidth }} className={style.progressBarAfter} />

        {[0, 1, 2, 3, 4].map((index) => (
          <li key={index} className={currentStep >= index ? style.active : ""}>
            <span style={{ borderColor: spanBorderColor(index, currentStep) }}></span>
          </li>
        ))}
      </ul>

      <div className={style.text}>
        <div style={{ color: coloroSelect(0, currentStep) }}>입찰</div>
        <div style={{ color: coloroSelect(1, currentStep) }}>조율</div>
        <div style={{ color: coloroSelect(2, currentStep) }}>주문완료</div>
        <div style={{ color: coloroSelect(3, currentStep) }}>제작완료</div>
        <div style={{ color: coloroSelect(4, currentStep) }}>픽업/배달완료</div>
      </div>
    </div>
  );
};

export default BuyerFllyListProgressBar;
