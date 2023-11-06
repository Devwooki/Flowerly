import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./step2.module.css";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  sellerDeliveryRegionState,
  sellerInputState,
  storeDeliveryRegionState,
  tempTokenState,
} from "@/recoil/tokenRecoil";

interface sidoDataType {
  sidoCode: number;
  sidoName: string;
}

interface sigunguDataType {
  sigunguCode: number;
  sigunguName: string;
}

interface dongDataType {
  dongCode: number;
  dongName: string;
}

const Step2 = () => {
  const [path, setPath] = useState<string | null>(null);
  const [host, setHost] = useState<string | null>(null);

  const router = useRouter();
  const [sidoData, setSidoData] = useState<sidoDataType[]>([]);
  const [selectedSido, setSelectedSido] = useState<sidoDataType | null>(null);
  const [sigunguData, setSigunguData] = useState<sigunguDataType[]>([]);
  const [selectedSigungu, setSelectedSigungu] = useState<sigunguDataType | null>(null);
  const [dongData, setDongData] = useState<dongDataType[]>([]);
  const [selectedDong, setSelectedDong] = useState<dongDataType | null>(null);

  const [deliveryRegionList, setDeliveryRegionList] = useRecoilState(sellerDeliveryRegionState);
  const [deliveryRegionCodeList, setDeliveryRegionCodeList] =
    useRecoilState(storeDeliveryRegionState);

  const [sellerInput, setSellerInput] = useRecoilState(sellerInputState);
  const tempToken = useRecoilValue(tempTokenState);

  useEffect(() => {
    const getSidoData = async () => {
      try {
        const response = await axios.get("https://flower-ly.co.kr/api/address/sido");
        setSidoData(response.data.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getSidoData();
  }, []);

  useEffect(() => {
    if (selectedSido) {
      getSigunguData(selectedSido.sidoCode);
      console.log(selectedSido.sidoCode);
    } else {
      setSigunguData([]);
    }
  }, [selectedSido]);

  useEffect(() => {
    if (selectedSigungu) {
      getDongData(selectedSigungu.sigunguCode);
      console.log(selectedSigungu.sigunguCode);
    } else {
      setSigunguData([]);
    }
  }, [selectedSigungu]);

  useEffect(() => {
    setPath(window.location.pathname);
    setHost(window.location.host);
    console.log(path, host);
  }, []);

  const getSigunguData = async (sidoCode: number) => {
    try {
      const response = await axios.get(`https://flower-ly.co.kr/api/address/sigungu/${sidoCode}`);
      setSigunguData(response.data.data.content);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getDongData = async (sigunguCode: number) => {
    try {
      const response = await axios.get(`https://flower-ly.co.kr/api/address/dong/${sigunguCode}`);
      setDongData(response.data.data.content);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSidoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = Number(event.target.value);
    const selectedSidoObj = sidoData.find((sido) => sido.sidoCode === selectedCode);
    setSelectedSido(selectedSidoObj || null);
  };

  const handleSigunguClick = (sigunguCode: number) => {
    const selectedSigunguObj = sigunguData.find((sigungu) => sigungu.sigunguCode === sigunguCode);
    setSelectedSigungu(selectedSigunguObj || null);
  };

  const handleDongClick = (dongName: string) => {
    const selectedDongObj = dongData.find((dong) => dong.dongName === dongName);
    setSelectedDong(selectedDongObj || null);
    if (selectedSido && selectedSigungu) {
      const fullAddress = `${selectedSido.sidoName} ${selectedSigungu.sigunguName} ${dongName}`;
      // 이미 리스트에 있는지 확인
      if (!deliveryRegionList.includes(fullAddress)) {
        setDeliveryRegionList((prevList) => [...prevList, fullAddress]);

        // deliveryRegionCodeList에 추가
        setDeliveryRegionCodeList((prevList) => [
          ...prevList,
          {
            sidoCode: selectedSido.sidoCode,
            sigunguCode: selectedSigungu.sigunguCode,
            dongCode: selectedDongObj!.dongCode,
          },
        ]);
      }
    }
  };

  const handleRemoveDeliveryRegion = (address: string) => {
    setDeliveryRegionList((prevList) => prevList.filter((item) => item !== address));
    setDeliveryRegionCodeList((prevList) =>
      prevList.filter(
        (item) =>
          item.sidoCode !== selectedSido?.sidoCode &&
          item.sigunguCode !== selectedSigungu?.sigunguCode &&
          item.dongCode !== selectedDong?.dongCode,
      ),
    );
  };

  const handleFinish = async () => {
    try {
      const signupData = {
        sellerInput,
        deliveryRegions: deliveryRegionCodeList,
      };
      console.log(signupData);

      if (host && path) {
        const response = await axios.post(
          "https://flower-ly.co.kr/api/member/signup/seller",
          signupData,
          {
            headers: {
              Authorization: `Bearer ${tempToken}`,
              "X-Request-Host": host,
              "X-Request-Path": path,
            },
          },
        );

        if (response.status === 200) {
          console.log(response);
          console.log("회원가입 성공");
          // 회원가입 성공
          router.push(`/temp?token=${tempToken}`);
        }

        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={style.container}>
        <h3>배달 가능 지역 선택</h3>
        <div>
          <div className={style.deliveryRegionList}>
            {deliveryRegionList.map((address, index) => (
              <div key={index} className={style.deliveryRegionItem}>
                {address}
                <button
                  className={style.removeButton}
                  onClick={() => handleRemoveDeliveryRegion(address)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={style.sidoDropDown}>
          <select onChange={handleSidoChange}>
            <option value="">지역을 선택해주세요</option>
            {sidoData &&
              sidoData.map((sido) => (
                <option key={sido.sidoCode} value={sido.sidoCode}>
                  {sido.sidoName}
                </option>
              ))}
          </select>
        </div>

        <div className={style.dataArea}>
          <div>
            {selectedSido && sigunguData.length > 0 && (
              <table className={style.sigunguTable}>
                <tbody>
                  {sigunguData.map((sigungu) => (
                    <tr key={sigungu.sigunguCode}>
                      <td
                        onClick={() => handleSigunguClick(sigungu.sigunguCode)}
                        className={
                          selectedSigungu?.sigunguCode === sigungu.sigunguCode
                            ? style.selectedItem
                            : ""
                        }
                      >
                        {sigungu.sigunguName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div>
            {selectedSigungu && dongData.length > 0 && (
              <table className={style.dongTable}>
                <tbody>
                  {Array.from({ length: Math.ceil(dongData.length / 2) }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.from({ length: 2 }).map((_, colIndex) => {
                        const dataItem = dongData[rowIndex * 2 + colIndex];
                        return (
                          <td
                            key={colIndex}
                            onClick={() => dataItem && handleDongClick(dataItem.dongName)}
                            className={
                              dataItem && selectedDong?.dongCode === dataItem?.dongCode
                                ? style.selectedItem
                                : ""
                            }
                          >
                            {dataItem?.dongName}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <button onClick={() => handleFinish()} className={style.finishButton}>
          완료
        </button>
      </div>
    </div>
  );
};

export default Step2;
