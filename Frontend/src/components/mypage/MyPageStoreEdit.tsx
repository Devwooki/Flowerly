import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";

import style from "./style/MyPageStoreEdit.module.css";
import Image from "next/image";
import { useDaumPostcodePopup } from "react-daum-postcode";
import axios from "axios";
import { ToastErrorMessage } from "@/model/toastMessageJHM";
import { tokenHttp } from "@/api/tokenHttp";
import { memberInfoState } from "@/recoil/memberInfoRecoil";
import { sellerAddressState } from "@/recoil/tokenRecoil";
import { ServerStoreInfo } from "@/components/mypage/MyPageStore";

const MyPageStoreEdit = () => {
  const Router = useRouter();
  const [memberInfo, setMemberInfo] = useRecoilState(memberInfoState);

  const [editData, setEditData] = useState({
    storeName: memberInfo.store?.storeName || "",
    sellerName: memberInfo.store?.sellerName || "",
    phoneNumber: memberInfo.store?.phoneNumber || "",
    storeNumber: memberInfo.store?.storeNumber || "",
    address: memberInfo.store?.address || "",
    sidoName: "",
    sigunguName: "",
    dongName: "",
  });

  const addressPart = editData.address ? editData.address.split("T") : ["", ""];

  const [basicAddress, setBasicAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [storeAddressCode, setStoreAddressCode] = useRecoilState(sellerAddressState);
  const [isStoreNumberValid, setIsStoreNumberValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(detailAddress);
  };

  const isAllDataFilled = () => {
    return (
      editData.storeName &&
      editData.sellerName &&
      editData.phoneNumber &&
      editData.storeNumber &&
      editData.address
    );
  };

  // 국세청 사업자등록 상태조회 api
  const handleCheckBusinessStatus = async () => {
    try {
      const storenumber = editData.storeNumber;

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

      if (response.status === 200) {
        const data = response.data;
        const b_stt_cd = data.data[0].b_stt_cd;

        if (b_stt_cd === "01") {
          ToastErrorMessage("사업자등록번호가 확인되었습니다.");
          setIsStoreNumberValid(true);
        } else {
          ToastErrorMessage("존재하지 않는 사업자등록번호입니다. 다시 입력해주세요");
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

    setEditData({
      ...editData,
      sidoName: data.sido,
      sigunguName: data.sigungu,
      dongName: data.bname,
    });

    setStoreAddressCode({
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
    setEditData((prevEditData) => ({ ...prevEditData, address: finalAddress }));
  }, [basicAddress, detailAddress, setEditData]);

  // 가게 정보 수정

  const editMyStoreData = () => {
    if (!isAllDataFilled() || !isStoreNumberValid) {
      ToastErrorMessage("모든 정보를 올바르게 입력해주세요");
      return;
    }

    tokenHttp
      .put("/mypage/store", editData)
      .then((response) => {
        if (response.data.code === 200) {
          const serverData = response.data.data as ServerStoreInfo;
          setMemberInfo((prevInfo) => ({
            ...prevInfo,
            store: {
              ...prevInfo.store,
              storeInfoId: serverData.storeId,
              storeName: serverData.storeName,
              sellerName: serverData.sellerName,
              phoneNumber: serverData.phoneNumber,
              storeNumber: serverData.storeNumber,
              address: serverData.address,
              images: prevInfo.store?.images || [],
            },
          }));

          console.log(memberInfo);
          console.log(response.data.data);

          Router.push("/mypage");

          if (response.headers.authorization) {
            localStorage.setItem("accessToken", response.headers.authorization);
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          Router.push("/fllylogin");
        }
      });
  };

  return (
    <>
      <div className={style.myStoreBack}>
        <div className={style.myStoreHeader}>
          <Image
            src="/img/btn/left-btn.png"
            alt="뒤로가기"
            width={13}
            height={20}
            onClick={() => {
              Router.back();
            }}
          />
          <div>가게 정보 수정</div>
        </div>
        <div className={style.myStoreMain}>
          <>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>상호명</div>

              <input
                type="text"
                name="storeName"
                value={editData.storeName}
                onChange={handleInputChange}
                className={style.storeInfoContent}
              />
            </div>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>사업자명</div>
              <input
                type="text"
                name="sellerName"
                value={editData.sellerName}
                onChange={handleInputChange}
                className={style.storeInfoContent}
              />
            </div>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>전화번호</div>
              <div className={style.infoWithBtn}></div>
              <input
                type="text"
                name="phoneNumber"
                value={editData.phoneNumber}
                onChange={handleInputChange}
                className={style.storeInfoContent}
              />
            </div>
            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>사업자등록번호 확인</div>

              <div className={style.infoWithBtn}>
                <input
                  type="text"
                  name="storeNumber"
                  value={editData.storeNumber}
                  onChange={handleInputChange}
                  className={style.storeInfoContent}
                />
                <button onClick={handleCheckBusinessStatus} className={style.confirmButton}>
                  확인
                </button>
              </div>
            </div>

            <div className={style.storeInfo}>
              <div className={style.storeInfoTitle}>주소</div>
              <div className={style.infoWithBtn}>
                <input
                  type="text"
                  name="basicAddress"
                  value={addressPart ? addressPart[0] : "기본주소 없음"}
                  onChange={handleInputChange}
                  className={style.storeInfoContent}
                />
                <button className={style.confirmButton} onClick={handleClick}>
                  주소 검색
                </button>
              </div>
              <input
                type="text"
                name="detailAddress"
                value={addressPart ? addressPart[1] : "상세주소 없음"}
                onChange={handleAddressChange}
                className={style.storeInfoContent}
              />
            </div>
            <button className={style.nextButton} onClick={() => editMyStoreData()}>
              수정 완료
            </button>
          </>
        </div>
      </div>
    </>
  );
};

export default MyPageStoreEdit;
