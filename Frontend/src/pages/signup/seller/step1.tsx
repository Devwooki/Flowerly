import React from "react";
import style from "./step1.module.css";
import { useRouter } from "next/router";

const Seller = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push("/signup/seller/step2");
  };

  return (
    <div>
      <div className={style.container}>
        <h2>회원가입</h2>
        <div className={style.inputContainer}>
          <label htmlFor="storename">상호명</label>
          <input type="text" id="storename" className={style.inputBox} />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="sellername">사업자명</label>
          <input type="text" id="sellername" className={style.inputBox} />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="phonenumber">전화번호</label>
          <input
            type="text"
            id="phonenumber"
            placeholder="000-0000-0000"
            className={style.inputBox}
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="auth">사업자 등록 번호 확인</label>
          <div>
            <input type="text" id="auth" className={style.inputBox} />
            <button>확인</button>
          </div>
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="address">주소</label>
          <input type="text" id="address" className={style.inputBox} />
        </div>

        <button onClick={() => handleNext()} className={style.nextButton}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Seller;
