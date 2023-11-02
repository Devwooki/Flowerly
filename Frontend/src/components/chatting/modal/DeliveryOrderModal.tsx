import style from "./OrderModal.module.css";
import Image from "next/image";

type DeliveryOrderProps = {
  modalHandler: Function;
  sendHandler: Function;
};

const DeliveryOrderModal: React.FC<DeliveryOrderProps> = ({ modalHandler, sendHandler }) => {
  const saveRequest = () => {
    // axios 주문 내용 저장해야함
    console.log("saveRequest");
  };

  return (
    <>
      <div className={style.modalBg}>
        <div className={style.modalMain}>
          <div className={style.top}>
            <div className={style.title}>배달 주문서 작성</div>
            <div
              className={style.closeBtn}
              onClick={() => {
                modalHandler("DELIVERY", false);
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
          <div className={style.middle}>
            <div className={style.subTitle}>주문 정보</div>
            <div className={style.content}>
              <div className={style.contentItem}>
                <div className={style.itemTitle}>주문자</div>
                <input className={style.input} id={style.nameInput} />
              </div>
              <div className={style.contentItem}>
                <div className={style.itemTitle}>연락처</div>
                <input className={`${style.input} ${style.phoneInput}`} />
                <div className={style.phoneDivide}>-</div>
                <input className={`${style.input} ${style.phoneInput}`} />
                <div className={style.phoneDivide}>-</div>
                <input className={`${style.input} ${style.phoneInput}`} />
              </div>
              <div className={style.contentItem}>
                <div className={style.itemTitle}>픽업일시</div>
                <div className={style.input} id={style.dateInput}>
                  <Image
                    className={style.icon}
                    src="/img/icon/calendar.png"
                    width={18}
                    height={18}
                    alt="상태이미지"
                  />
                </div>
              </div>
              <div className={style.contentItem} id={style.commentDiv}>
                <div className={style.itemTitle}>요청사항</div>
                <textarea className={style.input} id={style.commentArea} />
              </div>
            </div>
            <div className={style.subTitle}>배송 정보</div>
            <div className={style.content}>
              <div className={style.contentItem}>
                <div className={style.itemTitle}>받는이</div>
                <input className={style.input} id={style.nameInput} />
              </div>
              <div className={style.contentItem}>
                <div className={style.itemTitle}>연락처</div>
                <input className={`${style.input} ${style.phoneInput}`} />
                <div className={style.phoneDivide}>-</div>
                <input className={`${style.input} ${style.phoneInput}`} />
                <div className={style.phoneDivide}>-</div>
                <input className={`${style.input} ${style.phoneInput}`} />
              </div>
              <div className={style.contentItem}>
                <div className={style.itemTitle} id={style.addressTitle}>
                  주소
                </div>
                <div id={style.addressInput}>
                  <div className={style.input} id={style.addSearch}>
                    <button>검색</button>
                  </div>
                  <input className={style.input} placeholder="상세주소를 입력하세요."></input>
                </div>
              </div>
            </div>
          </div>
          <div className={style.bottom}>
            <button
              className={style.btn}
              onClick={() => {
                saveRequest();
                sendHandler();
                modalHandler("DELIVERY", false);
              }}
            >
              전송하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryOrderModal;
