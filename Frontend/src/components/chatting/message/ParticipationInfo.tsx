import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import style from "./style/ParticipationInfo.module.css";
import Image from "next/image";

import { tokenHttp } from "@/api/chattingTokenHttp";

type ParticipationFormProps = {
  chattingId: number;
  modalHandler: Function;
};
type Participation = {
  fllyId: number;
  buyerNickname: string;
  offerPrice: number;
  content: string;
  imageUrl: string;
};

const ParticipationForm: React.FC<ParticipationFormProps> = ({ chattingId, modalHandler }) => {
  const router = useRouter();
  const [participationInfo, setParticipationInfo] = useState<Participation | null>(null);

  useEffect(() => {
    tokenHttp
      .get(`/chatting/flly/${chattingId}`)
      .then((response) => {
        if (response.data.code === 200) {
          setParticipationInfo(response.data.data);
          //요거 필수!! (엑세스 토큰 만료로 재발급 받았다면 바꿔줘!! )
          if (response.headers.authorization) {
            localStorage.setItem("accessToken", response.headers.authorization);
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
        }
      });

    // axios.get(`https://flower-ly.co.kr/api/chatting/flly/${chattingId}`).then((response) => {
    //   setParticipationInfo(response.data.data);
    // });
  }, []);

  return (
    <>
      <div className={style.mainBox}>
        <div className={style.top}>
          <span id={style.nickname}>{participationInfo?.buyerNickname}</span> 님이
          <br />
          해당 상품에 관심을 가지고 있습니다.
        </div>
        <div className={style.middle}>
          <div
            className={style.imgDiv}
            style={{ backgroundImage: `url(${"/test/test-flower-img.png"})` }}
          ></div>
          <div className={style.contentDiv}>
            <div className={style.contentItem}>
              <Image
                className={style.icon}
                src="/img/icon/seller-money.png"
                width={14}
                height={14}
                alt="상태이미지"
              />
              <div id={style.price}>
                {participationInfo && participationInfo.offerPrice.toLocaleString()} 원
              </div>
            </div>
            <div className={style.contentItem}>
              <div>{participationInfo && participationInfo.content}</div>
            </div>
          </div>
        </div>
        <div className={style.bottom}>
          <button
            className={style.btn}
            onClick={() => modalHandler("FLLY", true, participationInfo?.fllyId)}
          >
            자세히 보기
          </button>
        </div>
      </div>
    </>
  );
};

export default ParticipationForm;
