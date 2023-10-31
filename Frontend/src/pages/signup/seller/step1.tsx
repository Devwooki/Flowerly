import React, { useState } from "react";
import style from "./step1.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilState } from "recoil";
import { sellerInputState } from "@/recoil/tokenRecoil";

const Step1 = () => {
  const router = useRouter();
  //사업자등록번호
  const [businessStaus, setBusinessStatus] = useState("");
  const [sellerInput, setSellerInput] = useRecoilState(sellerInputState);

  const handleNext = () => {
    // input 모두 입력 되었는지 확인하는 로직 추가
    router.push("/signup/seller/step2");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSellerInput({ ...sellerInput, [name]: value });
    console.log(sellerInput);
  };

  // 국세청 사업자등록 상태조회 api
  const handleCheckBusinessStatus = async () => {
    try {
      const auth = sellerInput.auth;

      const requestData = {
        b_no: [auth],
      };

      const response = await axios.post(
        "https://api.odcloud.kr/api/nts-businessman/v1/status",
        requestData,
        {
          params: {
            serviceKey:
              "iGii2cvGzpLwcqpE8YDszRXd7A7Iii+g9xkFrVigeYHkMje60AiTr1rSUvDcHJkkcgsazFgMWCco/vuiIB/zzg==",
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response.data);

      if (response.status === 200) {
        const data = response.data;
        const b_stt_cd = data.data[0].b_stt_cd;
        setBusinessStatus(b_stt_cd);

        if (b_stt_cd === "01") {
          alert("사업자등록번호가 확인되었습니다.");
        } else {
          alert("존재하지 않는 사업자등록번호입니다. 다시 입력해주세요");
        }
      } else {
        console.log("사업자등록번호 상태 조회 실패:", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={style.container}>
        <h2>회원가입</h2>
        <div className={style.inputContainer}>
          <label htmlFor="storename">상호명</label>
          <input
            type="text"
            id="storename"
            name="storename"
            className={style.inputBox}
            value={sellerInput.storename}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="sellername">사업자명</label>
          <input
            type="text"
            id="sellername"
            name="sellername"
            className={style.inputBox}
            value={sellerInput.sellername}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="phonenumber">전화번호</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            placeholder="000-0000-0000"
            className={style.inputBox}
            value={sellerInput.phonenumber}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="auth">사업자 등록 번호 확인</label>
          <div className={style.statusContainer}>
            <input
              type="text"
              id="auth"
              name="auth"
              className={style.statusInputBox}
              value={sellerInput.auth}
              onChange={handleInputChange}
            />
            <button onClick={handleCheckBusinessStatus} className={style.confirmButton}>
              확인
            </button>
          </div>
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="address">주소</label>
          <input
            type="text"
            id="address"
            name="address"
            className={style.inputBox}
            value={sellerInput.address}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={() => handleNext()} className={style.nextButton}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Step1;
