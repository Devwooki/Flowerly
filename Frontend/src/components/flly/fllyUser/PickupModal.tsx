import React, { useEffect, useRef, useState } from "react";
import style from "@/components/flly/fllyUser/PickupModal.module.css";
import { sidoDataType, sigunguDataType, dongDataType, regionType } from "@/recoil/fllyRecoil";
import axios from "axios";
import Image from "next/image";

interface Props {
  ModalChangeHandler: () => void;
  pickupCodeList: regionType[];
  setPickupCodeList: React.Dispatch<React.SetStateAction<regionType[]>>;
  pickupList: string[];
  setPickupList: React.Dispatch<React.SetStateAction<string[]>>;
}

const DeliveryModal = ({
  ModalChangeHandler,
  pickupCodeList,
  setPickupCodeList,
  pickupList,
  setPickupList,
}: Props) => {
  const [sidoData, setSidoData] = useState<sidoDataType[]>([]);
  const [selectedSido, setSelectedSido] = useState<sidoDataType | null>(null);
  const [sigunguData, setSigunguData] = useState<sigunguDataType[]>([]);
  const [selectedSigungu, setSelectedSigungu] = useState<sigunguDataType | null>(null);
  const [dongData, setDongData] = useState<dongDataType[]>([]);
  const [selectedDong, setSelectedDong] = useState<dongDataType | null>(null);
  const deliveryListRef = useRef<HTMLDivElement>(null);

  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    //상위 함수를 실행하지 말아라 (모달 꺼지는거 방지)
    e.stopPropagation();
  };

  useEffect(() => {
    const getSidoData = async () => {
      try {
        const response = await axios.get("https://flower-ly.co.kr/api/address/sido");
        setSidoData(response.data.data);
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

    if (selectedSigunguObj?.sigunguName === "전체") {
      if (selectedSido && selectedSigunguObj) {
        const fullAddress = `${selectedSido.sidoName} ${selectedSigunguObj.sigunguName}`;
        // 이미 리스트에 있는지 확인
        if (!pickupList.includes(fullAddress)) {
          setPickupList((prevList) => [...prevList, fullAddress]);

          // deliveryRegionCodeList에 추가
          setPickupCodeList((prevList) => [
            ...prevList,
            {
              sidoCode: selectedSido.sidoCode,
              sigunguCode: selectedSigunguObj.sigunguCode,
              dongCode: null,
            },
          ]);
        }
      }
    }
  };

  const handleDongClick = (dongName: string) => {
    const selectedDongObj = dongData.find((dong) => dong.dongName === dongName);
    setSelectedDong(selectedDongObj || null);
    if (selectedSido && selectedSigungu) {
      const fullAddress = `${selectedSido.sidoName} ${selectedSigungu.sigunguName} ${dongName}`;
      // 이미 리스트에 있는지 확인
      if (!pickupList.includes(fullAddress)) {
        setPickupList((prevList) => [...prevList, fullAddress]);

        // deliveryRegionCodeList에 추가
        setPickupCodeList((prevList) => [
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
    setPickupList((prevList) => prevList.filter((item) => item !== address));
    setPickupCodeList((prevList) =>
      prevList.filter(
        (item) =>
          item.sidoCode !== selectedSido?.sidoCode &&
          item.sigunguCode !== selectedSigungu?.sigunguCode &&
          item.dongCode !== selectedDong?.dongCode,
      ),
    );
  };

  return (
    <>
      <div className={style.checkBack} onClick={ModalChangeHandler}>
        <div className={style.modalBack} onClick={NotClickEventHandler}>
          <div className={style.title}>픽업 주소</div>
          <div>
            <div className={style.deliveryRegionList}>
              {pickupList.map((address, index) => (
                <div key={index} ref={deliveryListRef} className={style.deliveryRegionItem}>
                  {address}
                  <Image
                    alt="삭제"
                    src="/img/btn/gray-delete-btn.png"
                    width={5}
                    height={5}
                    className={style.removeButton}
                    onClick={() => handleRemoveDeliveryRegion(address)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={style.sidoDropDown}>
            <select onChange={handleSidoChange}>
              <option value="">지역을 선택해주세요</option>
              {sidoData.map((sido) => (
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

          <div className={style.modalBtnBox}>
            <div onClick={ModalChangeHandler}>완료</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryModal;
