import style from "./OrderFormMsg.module.css";

const OrderFormMsg = () => {
  return (
    <>
      <div className={style.mainBox}>
        <div className={style.title}>주문 유형을 선택해 주세요.</div>
        <div className={style.btnDiv}>
          <button className={style.btn}>픽업</button>
          <button className={style.btn}>배달</button>
        </div>
        <div className={style.desc}>배달 주문시 배송비가 발생할 수 있습니다.</div>
      </div>
    </>
  );
};

export default OrderFormMsg;
