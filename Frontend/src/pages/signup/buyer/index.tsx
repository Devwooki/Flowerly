import React, { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import style from "./Buyer.module.css";
import { useRecoilValue, useRecoilState } from "recoil";
import { tempTokenState, buyerInputState } from "../../../recoil/tokenRecoil";
import axios from "axios";

const Buyer = () => {
  const [path, setPath] = useState<string | null>(null);
  const [host, setHost] = useState<string | null>(null);
  const tempToken = useRecoilValue(tempTokenState);
  const [buyerInput, setBuyerInput] = useRecoilState(buyerInputState);

  useEffect(() => {
    setPath(window.location.pathname);
    setHost(window.location.host);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyerInput({ ...buyerInput, [name]: value });
  };

  const handleComplete = async () => {
    console.log(buyerInput);

    try {
      const response = await axios.post(
        "https://flower-ly.co.kr/api/member/signup/buyer",
        buyerInput,
        {
          headers: {
            Authorization: "Bearer " + tempToken,
            "X-Request-Host": host,
            "X-Request-Path": path,
          },
        },
      );

      if (response.status === 200) {
        if (tempToken) {
          console.log(response);
          console.log("회원가입 성공");
          router.push(`/temp?token=${tempToken}`);
        }
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
