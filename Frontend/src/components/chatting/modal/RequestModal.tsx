import { useState, useEffect } from "react";

import style from "./RequestModal.module.css";
import Image from "next/image";
import axios from "axios";

type RequestInfo = {
  requestId: number;
  storeName: string;
  ordererName: string;
  orderType: string;
  phoneNumber: string;
  deliveryPickupTime: string;
  requestContent: string;
  price: number;
  recipientName: string;
  recipientPhoneNumber: string;
  address: string;
};

type RequestModalProps = {
  chattingId: number;
  modalHandler: Function;
  sendHandler: Function;
};

const RequestModal: React.FC<RequestModalProps> = ({ chattingId, modalHandler, sendHandler }) => {
  // axios로 받아와야 함
  const [requestInfo, setRequestInfo] = useState<RequestInfo>();
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    axios.get(`https://flower-ly.co.kr/api/chatting/request/${chattingId}`).then((response) => {
      console.log(response.data.data);
      setRequestInfo(response.data.data);
    });
  }, []);

  const savePrice = () => {
    // console.log(price);
    const body = {
      requestId: requestInfo?.requestId,
      price: price,
    };
    axios.post("https://flower-ly.co.kr/api/chatting/request/price", body).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <div className={style.modalBg}>
        <div className={style.modalMain}>
          <div className={style.top}>
            <div className={style.title}>주문서</div>
            <div
              className={style.closeBtn}
              onClick={() => {
                modalHandler("REQUEST", false);
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
              <div className={style.storeNameDiv}>{requestInfo?.storeName}</div>
              <div className={style.contentItem}>
                <div className={style.itemTitle}>주문자</div>
                <div className={style.itemText}>{requestInfo?.ordererName}</div>
              </div>
              <div className={style.contentItem}>
                <div className={style.itemTitle}>연락처</div>
                <div className={style.itemText}>{requestInfo?.phoneNumber}</div>
              </div>
              <div className={style.contentItem}>
                <div className={style.itemTitle}>{requestInfo?.orderType}일시</div>
                <div className={style.itemText}>{requestInfo?.deliveryPickupTime}</div>
              </div>
              <div className={style.contentItem} id={style.commentDiv}>
                <div className={style.itemTitle}>요청사항</div>
                <div className={style.itemText}>{requestInfo?.requestContent}</div>
              </div>
            </div>
            {requestInfo?.orderType === "배달" && (
              <>
                <div className={style.subTitle}>배송 정보</div>
                <div className={style.content}>
                  <div className={style.contentItem}>
                    <div className={style.itemTitle}>받는이</div>
                    <div className={style.itemText}>{requestInfo?.recipientName}</div>
                  </div>
                  <div className={style.contentItem}>
                    <div className={style.itemTitle}>연락처</div>
                    <div className={style.itemText}>{requestInfo?.recipientPhoneNumber}</div>
                  </div>
                  <div className={style.contentItem}>
                    <div className={style.itemTitle} id={style.addressTitle}>
                      주소
                    </div>
                    <div id={style.addressInput}>
                      <div className={style.itemText}>{requestInfo?.address}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={style.bottom}>
            <div className={style.payDiv}>
              <div className={style.payTitle}>
                <Image
                  className={style.icon}
                  src="/img/icon/chatting-money.png"
                  width={18}
                  height={18}
                  alt="결제"
                />
                결제 금액
              </div>
              <div>
                <input
                  type="number"
                  className={style.input}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <button
              className={style.btn}
              onClick={() => {
                savePrice();
                sendHandler();
                modalHandler("REQUEST", false);
              }}
            >
              결제 요청
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestModal;
