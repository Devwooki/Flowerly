import React from "react";
import style from "./step2.module.css";
import { useRouter } from "next/router";

const Step2 = () => {
  const router = useRouter();

  const handleFinish = () => {
    router.push("/");
  };

  return (
    <div>
      <div className={style.container}>
        <h2>배달 가능 지역 선택</h2>
        <div></div>
        <button onClick={() => handleFinish()} className={style.finishButton}>
          완료
        </button>
      </div>
    </div>
  );
};

export default Step2;
