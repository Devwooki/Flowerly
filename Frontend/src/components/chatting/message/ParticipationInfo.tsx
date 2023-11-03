import { useState, useEffect } from "react";
<<<<<<< Updated upstream
import axios from "axios";
=======
>>>>>>> Stashed changes
import style from "./ParticipationInfo.module.css";
import Image from "next/image";
import FllyDetailModal from "../modal/FllyDetailModal";

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
  const [participationInfo, setParticipationInfo] = useState<Participation | null>(null);
  const [detailOpened, setDetailOpened] = useState(false);
  // axios로 fllyInfo 불러오기
  useEffect(() => {
<<<<<<< Updated upstream
    axios.get(`https://flower-ly.co.kr/api/chatting/flly/${chattingId}`).then((response) => {
      setParticipationInfo(response.data.data);
=======
    // setParticipationInfo({
    //   buyerNickname: "닉네임",
    //   flowers: ["파란 수국", "분홍 수국", "보라 수국"],
    //   deadline: "23-10-19 24:00",
    //   budget: 25000,
    //   imageUrl: "http://이미지URL",
    // });
    setParticipationInfo({
      fllyId: 1,
      buyerNickname: "수정",
      offerPrice: 30000,
      content:
        "이렇게 하면 더 예쁠 것 같은데 어떠세요~? 디자인은 얼마든지 조정 가능합니다 연락주세요^^",
      imageUrl: "http://image-URL",
>>>>>>> Stashed changes
    });
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
<<<<<<< Updated upstream
            <div className={style.contentItem} id={style.price}>
=======
            <div className={style.contentItem}>
>>>>>>> Stashed changes
              <Image
                className={style.icon}
                src="/img/icon/seller-money.png"
                width={14}
                height={14}
                alt="상태이미지"
              />
<<<<<<< Updated upstream
              <div id={style.price}>
                {participationInfo && participationInfo.offerPrice.toLocaleString()} 원
              </div>
            </div>
            <div className={style.contentItem} id={style.comment}>
=======
              <div id={style.price}>{participationInfo && participationInfo.offerPrice}</div>
            </div>
            <div className={style.contentItem}>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
        {/* <div className={style.top}>해당 상품에 관심을 가지고 있습니다.</div>
        <div className={style.middle}>
          <div
            className={style.imgDiv}
            style={{ backgroundImage: `url(${"/test/test-flower-img.png"})` }}
          ></div>
          <div className={style.contentDiv}>
            <div className={style.contentItem}>
              <Image
                className={style.icon}
                src="/img/icon/seller-user.png"
                width={14}
                height={14}
                alt="상태이미지"
              />
              <div>{fllyInfo && fllyInfo.buyerNickname}</div>
            </div>
            <div className={style.contentItem} id={style.flowerItem}>
              <Image
                className={style.icon}
                src="/img/icon/seller-flower.png"
                width={14}
                height={14}
                alt="상태이미지"
              />
              <div>
                {fllyInfo &&
                  fllyInfo.flowers.map((flower, idx) => {
                    return <div key={idx}>{flower}</div>;
                  })}
              </div>
            </div>
            <div className={style.contentItem}>
              <Image
                className={style.icon}
                src="/img/icon/seller-time.png"
                width={14}
                height={14}
                alt="상태이미지"
              />
              <div>{fllyInfo && fllyInfo.deadline}</div>
            </div>
            <div className={style.contentItem}>
              <Image
                className={style.icon}
                src="/img/icon/seller-money.png"
                width={14}
                height={14}
                alt="상태이미지"
              />
              <div>{fllyInfo && fllyInfo.budget}원</div>
            </div>
          </div>
        </div>
        <div className={style.bottom}>
          <button className={style.btn}>자세히 보기</button>
        </div> */}
>>>>>>> Stashed changes
      </div>
    </>
  );
};

export default ParticipationForm;
