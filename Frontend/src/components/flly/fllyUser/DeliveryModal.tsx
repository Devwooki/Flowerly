import React, { useEffect, useState } from "react";
import style from "@/components/flly/fllyUser/DeliveryModal.module.css";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { deliveryAddressType } from "@/recoil/fllyRecoil";

interface Props {
  ModalChangeHandler: () => void;
  UpdateBasicAddress: (newAddress: string) => void;
  initialAddress: string;
  initialDetailAddress: string;
  UpdateDetailAddress: (newAddress: string) => void;
  setAddressCode: React.Dispatch<React.SetStateAction<deliveryAddressType>>;
}

const DeliveryModal = ({
  ModalChangeHandler,
  UpdateBasicAddress,
  initialAddress,
  initialDetailAddress,
  UpdateDetailAddress,
  setAddressCode,
}: Props) => {
  const [basicAddress, setBasicAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    //상위 함수를 실행하지 말아라 (모달 꺼지는거 방지)
    e.stopPropagation();
  };

  const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

  const open = useDaumPostcodePopup(scriptUrl);
  const handleComplete = (data: any) => {
    let jibunAddress = data.jibunAddress;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      jibunAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setBasicAddress(jibunAddress);
    UpdateBasicAddress(jibunAddress);

    setAddressCode({
      sido: data.sido,
      sigungu: data.sigungu,
      dong: data.bname,
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicAddress(value);
  };

  const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
    UpdateDetailAddress(e.target.value);
  };

  useEffect(() => {
    setBasicAddress(initialAddress);
    setDetailAddress(initialDetailAddress);
    /* eslint-disable-next-line */
  }, []);

  return (
    <>
      <div className={style.checkBack} onClick={ModalChangeHandler}>
        <div className={style.modalBack} onClick={NotClickEventHandler}>
          <div className={style.title}>배달 주소</div>
          <div className={style.search}>
            <input
              type="text"
              placeholder="주소검색 버튼을 통해 입력해주세요."
              className={style.textBack}
              // value={basicAddress}
              onChange={handleInputChange}
              readOnly
            />
            <button className={style.findBtn} onClick={handleClick}>
              주소 검색
            </button>
          </div>
          <div
            className={
              basicAddress === "" ? `${style.textBack} ${style.textColor}` : style.textBack
            }
          >
            {basicAddress === "" ? "기본 주소 영역입니다." : basicAddress}
          </div>
          <input
            type="text"
            placeholder="상세 주소 영역입니다."
            className={style.textBack}
            value={detailAddress}
            onChange={handleDetailAddress}
          ></input>
          <div className={style.modalBtnBox}>
            <div onClick={ModalChangeHandler}>완료</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryModal;
