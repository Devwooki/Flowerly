import React, { useEffect, useState } from "react";
import style from "./step1.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilState } from "recoil";
import { sellerInputState, sellerAddressState } from "@/recoil/tokenRecoil";
import { useDaumPostcodePopup } from "react-daum-postcode";

const Step1 = () => {
  const router = useRouter();
  //사업자등록번호

  const [sellerInput, setSellerInput] = useRecoilState(sellerInputState);
  const [basicAddress, setBasicAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [sellerAddress, setSellerAddress] = useRecoilState(sellerAddressState);
  const [isStoreNumberValid, setIsStoreNumberValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSellerInput({ ...sellerInput, [name]: value });
    console.log(sellerInput);
  };

  const isAllDataFilled = () => {
    return (
      sellerInput.storename &&
      sellerInput.sellername &&
      sellerInput.phonenumber &&
      sellerInput.storenumber &&
      basicAddress &&
      detailAddress
    );
  };

  const handleNext = () => {
    // input 모두 입력 되었는지 확인하는 로직 추가
    if (isAllDataFilled() && isStoreNumberValid) {
      router.push("/signup/seller/step2");
    } else {
      alert("모든 정보를 입력해주세요");
    }
  };

  // 국세청 사업자등록 상태조회 api
  const handleCheckBusinessStatus = async () => {
    try {
      const storenumber = sellerInput.storenumber;

      const requestData = {
        b_no: [storenumber],
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

        if (b_stt_cd === "01") {
          alert("사업자등록번호가 확인되었습니다.");
          setIsStoreNumberValid(true);
        } else {
          alert("존재하지 않는 사업자등록번호입니다. 다시 입력해주세요");
          setIsStoreNumberValid(false);
        }
      } else {
        console.log("사업자등록번호 상태 조회 실패:", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 다음 주소 api

  const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

  const open = useDaumPostcodePopup(scriptUrl);
  const handleComplete = (data: any) => {
    let roadAddress = data.roadAddress;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      roadAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    setBasicAddress(roadAddress);

    setSellerAddress({
      sido: data.sido,
      sigungu: data.sigungu,
      dong: data.bname,
    });
  };

  // 트리거 해줄 함수
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  useEffect(() => {
    const finalAddress = `${basicAddress}T${detailAddress}`;
    setSellerInput((prevSellerInput) => ({ ...prevSellerInput, address: finalAddress }));
    console.log(finalAddress);
  }, [basicAddress, detailAddress, setSellerInput]);

  return (
    <div className={style.back}>
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
          <label htmlFor="storenumber">사업자 등록 번호 확인</label>
          <div className={style.statusContainer}>
            <input
              type="text"
              id="storenumber"
              name="storenumber"
              className={style.statusInputBox}
              value={sellerInput.storenumber}
              onChange={handleInputChange}
            />
            <button onClick={handleCheckBusinessStatus} className={style.confirmButton}>
              확인
            </button>
          </div>
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="basicaddress">주소</label>
          <div className={style.statusContainer}>
            <input
              type="text"
              id="basicaddress"
              name="basicaddress"
              placeholder="주소검색을 통해 입력해주세요"
              className={style.statusInputBox}
              value={basicAddress}
              onChange={handleInputChange}
            />
            <button className={style.confirmButton} onClick={handleClick}>
              주소 검색
            </button>
          </div>
          <input
            type="text"
            id="detailaddress"
            name="detailaddress"
            placeholder="상세주소를 입력해주세요"
            className={style.inputBox}
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
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
