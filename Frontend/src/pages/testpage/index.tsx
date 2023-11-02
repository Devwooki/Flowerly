import TestCompo from "@components/TestCompo";
import React, { useState } from "react";
import style from "./testpage.module.css";
const TestPageMain = () => {
  const [set, getSet] = useState(false);

  const chmod = () => {
    getSet((prevSet) => !prevSet);
  };

  const dalle = () => {
    console.log("이미지 테스트");
  };

  return (
    <div className={style.common}>
      <h2 className={set ? `${style.blue}` : style.red} onClick={() => chmod()}>
        TestPageMain에 왔져염!!! 뿌웅!!!
      </h2>
      <h2 className={set ? style.red : style.blue} onClick={() => chmod()}>
        클릭해 봐
      </h2>
      <button onClick={() => dalle()}>달리 사용</button>
      <TestCompo />
    </div>
  );
};

export default TestPageMain;
