import React from "react";
import router, { useRouter } from "next/router";
import style from "./buyer.module.css";
import { useRecoilValue, useRecoilState } from "recoil";
import { tempTokenState, buyerInputState } from "../../../recoil/tokenRecoil";
import axios from "axios";

// 닉네임 중복 검사 로직 추가해야함.

const Buyer = () => {
  const tempToken = useRecoilValue(tempTokenState);
  const [buyerInput, setBuyerInput] = useRecoilState(buyerInputState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyerInput({ ...buyerInput, [name]: value });
    console.log(buyerInput);
  };

  const handleComplete = async () => {
    console.log(buyerInput);

    try {
      const response = await axios.post("api/signup/buyer", {
        tempToken: tempToken,
        buyerInput: buyerInput,
      });

      if (response.status === 200) {
        router.push(`/tempToken/${tempToken}`);
      } else {
        console.error("회원가입 실패:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={style.container}>
        <div className={style.header}>
          플리에서 사용할 <br></br>
          닉네임을 입력해주세요.
        </div>
        <input
          className={style.inputBox}
          id="nickname"
          name="nickname"
          value={buyerInput.nickname}
          onChange={handleInputChange}
        ></input>

        <button className={style.button} onClick={handleComplete}>
          완료
        </button>
      </div>
    </div>
  );
};

export default Buyer;
