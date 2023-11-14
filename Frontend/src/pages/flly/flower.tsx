import React, { useEffect } from "react";
import style from "@/components/flly/fllyUser/FllyFlower.module.css";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { situationState, randomFlowerState } from "@/recoil/fllyRecoil";
import { targetState } from "@/recoil/fllyRecoil";
import { colorState } from "@/recoil/fllyRecoil";
import { flowerState } from "@/recoil/fllyRecoil";
import { flowerCardType } from "@/recoil/fllyRecoil";
import Image from "next/image";
import { useRouter } from "next/router";
import CheckModal from "@/components/flly/fllyUser/CheckModal";
import { ToastErrorMessage } from "@/model/toastMessageJHM";
import { tokenHttp } from "@/api/tokenHttp";

const FllyFlower = () => {
  const [showPrevModal, setShowPrevModal] = useState<boolean>(false);
  const [showNextModal, setShowNextModal] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const situation = useRecoilValue(situationState);
  const target = useRecoilValue(targetState);
  const colors = useRecoilValue(colorState);
  const [selectedFlowers, setSelcetedFlowers] = useRecoilState(flowerState);
  const [randomFlower, setRandomFlower] = useRecoilState(randomFlowerState);
  const [selected, setSelected] = useState<number[]>([]);
  const [flowers, setFlowers] = useState<flowerCardType[]>([]);
  const [flowersColor, setFlowersColor] = useState<flowerCardType[]>([]);
  const [flowersMeaning, setFlowersMeaning] = useState<flowerCardType[]>([]);
  const router = useRouter();

  const axiosHandler = () => {
    tokenHttp
      .post(`/flly`, {
        situation: situation == "선택 안함" ? null : [situation],
        target: target == "선택 안함" ? null : [target],
        colors: colors.includes("선택 안함") ? null : colors,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        if (response.data.code === 200) {
          setFlowers(response.data.data.flowers);
          setFlowersColor(response.data.data.flowersColor);
          setFlowersMeaning(response.data.data.flowersMeaning);
          if (response.headers.authorization)
            localStorage.setItem("accessToken", response.headers.authorization);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          router.push("/fllylogin");
        } else ToastErrorMessage("오류가 발생했습니다.");
      });

    console.log(
      situation == "선택 안함" ? null : [situation],
      target == "선택 안함" ? null : [target],
      colors.includes("선택 안함") ? null : colors,
    );
  };

  const handleSelect = (e: flowerCardType) => {
    if (selected.includes(e.flowerCode)) {
      subValue(e);
    } else if (selected.length < 3) {
      addValue(e);
    }
  };

  const subValue = (value: flowerCardType) => {
    const updatedSelected = selected.filter((item) => item != value.flowerCode);
    const updatedFlowers = selectedFlowers.filter((item) => item.flowerCode !== value.flowerCode);
    setSelected(updatedSelected);
    setSelcetedFlowers(updatedFlowers);
  };

  const addValue = (newValue: flowerCardType) => {
    const updatedSelected = [...selected, newValue.flowerCode];
    const updatedFlowers = [...selectedFlowers, newValue];
    setSelected(updatedSelected);
    setSelcetedFlowers(updatedFlowers);
  };

  useEffect(() => {
    selectedFlowers.map((value, index) => {
      selected.push(value.flowerCode);
    });
  }, []);

  useEffect(() => {
    axiosHandler();
  }, []);

  useEffect(() => {
    if (selectedFlowers.length !== 0) setCheck(true);
    else setCheck(false);
  }, [selectedFlowers]);

  // 배열에서 랜덤하게 n개의 요소를 선택하는 함수
  const getRandomElements = (arr: flowerCardType[], n: number) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const handleClickNext = () => {
    // 선택을 안하거나 조금 했을 때에 대한 처리
    if (selectedFlowers.length == 0) {
      setRandomFlower(getRandomElements(flowers, Math.min(3, flowers.length)));
    }
    setShowNextModal(true);
  };

  const handleClickPrev = () => {
    setShowPrevModal(true);
  };

  const prevBtnHandler = () => {
    setShowPrevModal(!showPrevModal);
  };

  const nextBtnHandler = () => {
    setShowNextModal(!showNextModal);
  };

  return (
    <>
      <div className={style.fllyBox}>
        {showPrevModal && (
          <CheckModal
            ModalChangeHandler={prevBtnHandler}
            question={"이전의 선택을 변경하시겠습니까?"}
            explain={"선택했던 꽃 초기화 후 색 선택으로 이동합니다."}
            routerHref={"color"}
          />
        )}
        {showNextModal && (
          <CheckModal
            ModalChangeHandler={nextBtnHandler}
            question={"꽃다발 생성을 시작하겠습니까?"}
            explain={"선택했던 정보로 꽃다발 생성을 시작합니다."}
            routerHref={"loading"}
          />
        )}
        <div className={style.contentBox}>
          <div className={style.headerTitle}>
            <div className={style.guide}>원하는 꽃을 선택해주세요.</div>
            <div className={style.guidePlus}>최대 3개까지 선택 가능합니다.</div>
          </div>
          <div className={style.selectAreaBox}>
            {flowers.length === 0 && flowersMeaning.length === 0 ? (
              <div className={style.selectLoading}>
                <Image src="/img/etc/loading.gif" width={100} height={100} alt="loading" />
                <div>꽃 목록을 로딩중입니다.</div>
              </div>
            ) : (
              <div className={style.selectBox}>
                {flowers.map((item, index) => (
                  <div
                    key={index}
                    className={style.selectCard}
                    onClick={() => {
                      handleSelect(item);
                    }}
                  >
                    <div
                      className={
                        selected.includes(item.flowerCode)
                          ? `${style.selectImg} ${style.selectedImg}`
                          : style.selectImg
                      }
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    >
                      {selected.includes(item.flowerCode) && (
                        <Image src="/img/icon/check.png" width={60} height={45} alt="체크"></Image>
                      )}
                    </div>
                    <div className={style.selectWord}>
                      <div className={style.flowerName}>{item.flowerName}</div>
                      <div className={style.flowerMeaning}>{item.meaning}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {flowersColor != null && flowersColor.length != 0 && (
              <div>
                <div className={style.sentence}>선택한 색의 꽃</div>
                <div className={style.selectBox}>
                  {flowersColor.map((item, index) => (
                    <div
                      key={index}
                      className={style.selectCard}
                      onClick={() => {
                        handleSelect(item);
                      }}
                    >
                      <div
                        className={
                          selected.includes(item.flowerCode)
                            ? `${style.selectImg} ${style.selectedImg}`
                            : style.selectImg
                        }
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                      >
                        {selected.includes(item.flowerCode) && (
                          <Image
                            src="/img/icon/check.png"
                            width={60}
                            height={45}
                            alt="체크"
                          ></Image>
                        )}
                      </div>
                      <div className={style.selectWord}>
                        <div className={style.flowerName}>{item.flowerName}</div>
                        <div className={style.flowerMeaning}>{item.meaning}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {flowersMeaning != null && flowersMeaning.length != 0 && (
              <div>
                <div className={style.sentence}>선택한 상황과 대상의 꽃</div>
                <div className={style.selectBox}>
                  {flowersMeaning.map((item, index) => (
                    <div
                      key={index}
                      className={style.selectCard}
                      onClick={() => {
                        handleSelect(item);
                      }}
                    >
                      <div
                        className={
                          selected.includes(item.flowerCode)
                            ? `${style.selectImg} ${style.selectedImg}`
                            : style.selectImg
                        }
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                      >
                        {selected.includes(item.flowerCode) && (
                          <Image
                            src="/img/icon/check.png"
                            width={60}
                            height={45}
                            alt="체크"
                          ></Image>
                        )}
                      </div>
                      <div className={style.selectWord}>
                        <div className={style.flowerName}>{item.flowerName}</div>
                        <div className={style.flowerMeaning}>{item.meaning}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={style.btnBox}>
          <div onClick={handleClickPrev} className={style.prevBtn}>
            &lt;
          </div>
          <div onClick={handleClickNext} className={style.nextBtn}>
            다음
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyFlower;
