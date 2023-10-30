import React from "react";
import style from "./buyer.module.css";

const Buyer = () => {
  return (
    <div>
      <div className={style.container}>
        <div className={style.header}>
          플리에서 사용할 <br></br>
          닉네임을 입력해주세요.
        </div>
        <input className={style.inputBox}></input>

        <button className={style.button}>완료</button>
      </div>
    </div>
  );
};

export default Buyer;
