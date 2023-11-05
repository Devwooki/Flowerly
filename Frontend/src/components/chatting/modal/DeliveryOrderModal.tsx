import { useState, useEffect } from "react";
import axios from "axios";
import style from "./OrderModal.module.css";
import Image from "next/image";

type DeliveryOrderProps = {
  chattingId: number;
  modalHandler: Function;
  sendHandler: Function;
};

const DeliveryOrderModal: React.FC<DeliveryOrderProps> = ({
  chattingId,
  modalHandler,
  sendHandler,
}) => {
  const [orderInputs, setOrderInputs] = useState({
    orderType: "DELIVERY",
    ordererName: "",
    phoneNumber: "",
    deliveryPickupTime: "2023-11-04 18:00",
    requestContent: "",
    recipientName: "",
    recipientPhoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (orderInputs.phoneNumber.length === 10) {
      setOrderInputs((prev) => {
        return {
          ...prev,
          phoneNumber: prev.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
        };
      });
    }
    if (orderInputs.phoneNumber.length === 13) {
      setOrderInputs((prev) => {
        return {
          ...prev,
          phoneNumber: prev.phoneNumber
            .replace(/-/g, "")
            .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
        };
      });
    }
  }, [orderInputs.phoneNumber]);

  useEffect(() => {
    if (orderInputs.recipientPhoneNumber.length === 10) {
      setOrderInputs((prev) => {
        return {
          ...prev,
          recipientPhoneNumber: prev.recipientPhoneNumber.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "$1-$2-$3",
          ),
        };
      });
    }
    if (orderInputs.recipientPhoneNumber.length === 13) {
      setOrderInputs((prev) => {
        return {
          ...prev,
          recipientPhoneNumber: prev.recipientPhoneNumber
            .replace(/-/g, "")
            .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
        };
      });
    }
  }, [orderInputs.recipientPhoneNumber]);

  const saveRequest = () => {
    // console.log("saveRequest");
    // console.log(orderInputs);
    axios
      .post(`https://flower-ly.co.kr/api/chatting/request/${chattingId}`, orderInputs)
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => console.log(error));
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
                <input
                  className={style.input}
                  id={style.nameInput}
                  value={orderInputs.ordererName}
                  onChange={(e) =>
                    setOrderInputs((prev) => {
                      return { ...prev, ordererName: e.target.value };
                    })
                  }
                />
              </div>
              <div className={style.contentItem}>
                <div className={style.itemTitle}>연락처</div>
                <input
                  className={style.input}
                  id={style.nameInput}
                  type="text"
                  value={orderInputs.phoneNumber}
                  onChange={(e) => {
                    const regex = /^[0-9\b -]{0,13}$/;
                    if (regex.test(e.target.value)) {
                      setOrderInputs((prev) => {
                        return { ...prev, phoneNumber: e.target.value };
                      });
                    }
                  }}
                />
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
                <textarea
                  className={style.input}
                  id={style.commentArea}
                  value={orderInputs.requestContent}
                  onChange={(e) =>
                    setOrderInputs((prev) => {
                      return { ...prev, requestContent: e.target.value };
                    })
                  }
                />
              </div>
            </div>
            <div className={style.subTitle}>배송 정보</div>
            <div className={style.content}>
              <div className={style.contentItem}>
                <div className={style.itemTitle}>받는이</div>
                <input
                  className={style.input}
                  id={style.nameInput}
                  value={orderInputs.recipientName}
                  onChange={(e) =>
                    setOrderInputs((prev) => {
                      return { ...prev, recipientName: e.target.value };
                    })
                  }
                />
              </div>
              <div className={style.contentItem}>
                <div className={style.itemTitle}>연락처</div>
                <input
                  className={style.input}
                  id={style.nameInput}
                  type="text"
                  value={orderInputs.recipientPhoneNumber}
                  onChange={(e) => {
                    const regex = /^[0-9\b -]{0,13}$/;
                    if (regex.test(e.target.value)) {
                      setOrderInputs((prev) => {
                        return { ...prev, recipientPhoneNumber: e.target.value };
                      });
                    }
                  }}
                />
              </div>
              <div className={style.contentItem}>
                <div className={style.itemTitle} id={style.addressTitle}>
                  주소
                </div>
                <div id={style.addressInput}>
                  <div className={style.input} id={style.addSearch}>
                    <button>검색</button>
                  </div>
                  <input
                    className={style.input}
                    placeholder="상세주소를 입력하세요."
                    value={orderInputs.address}
                    onChange={(e) =>
                      setOrderInputs((prev) => {
                        return { ...prev, address: e.target.value };
                      })
                    }
                  />
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
