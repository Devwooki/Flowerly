import { useState } from "react";
import style from "./FllyDetailModal.module.css";
import Image from "next/image";

type FllyDetailProps = {
  fllyId: number | undefined;
  modalHandler: Function;
};

const FllyDetailModal: React.FC<FllyDetailProps> = ({ fllyId, modalHandler }) => {
  // axios로 받아와야 함
  const [fllyDetail, setFllyDetail] = useState({
    fllyWanted: {
      buyerNickame: "수정",
      situation: "사랑",
      target: "연인",
      colors: "분홍, 파랑",
      flowers: "분홍 수국, 파랑 수국, 보라 수국",
      budget: 30000,
      deadline: "2023-10-20 18:00",
      orderType: "배달",
      address: "대전광역시 유성구",
      requestContent: "파랑 수국보다 분홍 수국이 더 많이 들어갔으면 좋겠어요",
    },
    fllyParticiation: {
      imageUrl: "http://image-URL",
      offerPrice: 30000,
      content:
        "이렇게 하면 더 예쁠 것 같은데 어떠세요~? 디자인은 얼마든지 조정 가능합니다 연락주세요^^",
    },
  });
  return (
    <>
      <div className={style.modalBg}>
        <div className={style.modalMain}>
          <div className={style.top}>
            <div className={style.title}>플리 정보</div>
            <div
              className={style.closeBtn}
              onClick={() => {
                modalHandler("FLLY", false);
              }}
            >
              <Image
                className={style.icon}
                src="/img/icon/close.png"
                width={17}
                height={17}
                alt="닫기 버튼"
              />
            </div>
          </div>
          <div className={style.contents}>
            <div className={style.contentItem}>
              <div className={style.subTitle}>의뢰 내용</div>
              <table className={style.wantedTb}>
                <tbody>
                  <tr>
                    <th>의뢰인</th>
                    <td>{fllyDetail.fllyWanted.buyerNickame}</td>
                  </tr>
                  <tr>
                    <th>상황</th>
                    <td>{fllyDetail.fllyWanted.situation}</td>
                  </tr>
                  <tr>
                    <th>대상</th>
                    <td>{fllyDetail.fllyWanted.target}</td>
                  </tr>
                  <tr>
                    <th>색상</th>
                    <td>{fllyDetail.fllyWanted.colors}</td>
                  </tr>
                  <tr>
                    <th>선택꽃</th>
                    <td>{fllyDetail.fllyWanted.flowers}</td>
                  </tr>
                  <tr>
                    <th>예산</th>
                    <td>{fllyDetail.fllyWanted.budget}</td>
                  </tr>
                  <tr>
                    <th>마감시간</th>
                    <td>{fllyDetail.fllyWanted.deadline}</td>
                  </tr>
                  <tr>
                    <th>주문유형</th>
                    <td>{fllyDetail.fllyWanted.orderType}</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>{fllyDetail.fllyWanted.address}</td>
                  </tr>
                  <tr>
                    <th>요청사항</th>
                    <td>{fllyDetail.fllyWanted.requestContent}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={style.contentItem}>
              <div className={style.subTitle}>제안 내용</div>
              <div className={style.partDiv}>
                <div
                  className={style.imgDiv}
                  style={{ backgroundImage: `url(${"/test/test-flower-img.png"})` }}
                ></div>
                <div className={style.textDiv}>
                  <div id={style.price}>{fllyDetail.fllyParticiation.offerPrice} 원</div>
                  <div>{fllyDetail.fllyParticiation.content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyDetailModal;
