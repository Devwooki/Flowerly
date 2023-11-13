import React from "react";
import { tokenHttp } from "@/api/tokenHttp";
import { sellerDeliveryRegionState, storeDeliveryRegionState } from "@/recoil/tokenRecoil";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "@/components/mypage/MyPageSettingComponent/DeliveryAreaChange.module.css";
import { useRecoilState } from "recoil";

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

const DeliveryAreaChange = () => {
  // api로 서버에서 데이터 조회

  //storeDeliveryRegionState에 update
  // 이미 선택되어 있어야 하고, 선택된 지역은 다른 색으로 표시되어야 함
  // 선택된 지역은 삭제할 수 있어야 함
  // 선택된 지역은 문자열로 표시되어야 함-sellerDeliveryRegionState 활용

  // 수정 버튼을 누르면 수정하는 api 호출

  // 이때 수정하는 api는 storeDeliveryRegionState와 sellerDeliveryRegionState에 update된 데이터를 보내줘야함
  const Router = useRouter();
  const [sidoData, setSidoData] = useState<sidoDataType[]>([]);
  const [selectedSido, setSelectedSido] = useState<sidoDataType | null>(null);
  const [sigunguData, setSigunguData] = useState<sigunguDataType[]>([]);
  const [selectedSigungu, setSelectedSigungu] = useState<sigunguDataType | null>(null);
  const [dongData, setDongData] = useState<dongDataType[]>([]);
  const [selectedDong, setSelectedDong] = useState<dongDataType | null>(null);

  const [deliveryRegionList, setDeliveryRegionList] = useRecoilState(sellerDeliveryRegionState);
  const [deliveryRegionCodeList, setDeliveryRegionCodeList] =
    useRecoilState(storeDeliveryRegionState);

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

  // 배달 가능 지역 조회
  useEffect(() => {
    const getDeliveryRegion = () => {
      tokenHttp
        .get("mypage/delivery")
        .then((response) => {
          console.log(response.data.data);
          setDeliveryRegionCodeList(response.data.data);

          if (response.headers.authorization) {
            localStorage.setItem("accessToken", response.headers.authorization);
          }
        })
        .catch((error) => {
          console.error("배달 가능 지역 조회 실패", error);

          if (error.response && error.response.status === 403) {
            Router.push("/fllylogin");
          }
        });
    };

    getDeliveryRegion();
  }, []);

  // 배달 가능 지역 수정

  const handleModifyDeliveryRegion = () => {
    tokenHttp
      .put("/mypage/delivery", deliveryRegionCodeList)
      .then((response) => {
        if (response.data.code === 200) {
          console.log(response.data.data);
          setDeliveryRegionCodeList(response.data.data);

          // name으로 설정해서 인풋 창에 넣어야 함.

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

          <button onClick={() => handleModifyDeliveryRegion()} className={style.finishButton}>
            수정 완료
          </button>
        </div>
      </div>
    </>
  );
};

export default DeliveryAreaChange;
