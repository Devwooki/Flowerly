import style from "./ProgressBar.module.css";
import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const [barWidth, setBarWidth] = useState("0");
  const stepWidths = ["0", "20%", "40%", "60%", "100%"];
  const stepWidthShort = ["0", "20%", "36%", "58.2%", "100%"];
  // const stepWidthShort = ["0", "20%", "36%", "58.2%", "100%"];

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

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth <= 400) {
        setBarWidth(stepWidthShort[currentStep]);
      } else {
        setBarWidth(stepWidths[currentStep]);
      }
    };
    window.addEventListener("resize", updateWidth);

    // 컴포넌트가 언마운트되거나 currentStep이 변경되기 전에 이벤트 리스너를 정리
    return () => window.removeEventListener("resize", updateWidth);
    /* eslint-disable-next-line */
  }, [currentStep]);

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

export default ProgressBar;
