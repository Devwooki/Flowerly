import style from "./style/OrderFormMsg.module.css";

type OrderFormProps = {
  modalHandler: Function;
};

const OrderFormMsg: React.FC<OrderFormProps> = ({ modalHandler }) => {
  return (
    <>
      <div className={style.mainBox}>
        <div className={style.title}>주문 유형을 선택해 주세요.</div>
        <div className={style.btnDiv}>
          <button
            className={style.btn}
            onClick={() => {
              modalHandler("PICKUP", true);
            }}
          >
            픽업
          </button>
          <button
            className={style.btn}
            onClick={() => {
              modalHandler("DELIVERY", true);
            }}
          >
            배달
          </button>
        </div>
        <div className={style.desc}>배달 주문시 배송비가 발생할 수 있습니다.</div>
      </div>
    </>
  );
};

export default OrderFormMsg;
