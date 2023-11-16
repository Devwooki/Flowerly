import style from "./style/OrderFormMsg.module.css";

import { memberInfoState } from "@/recoil/memberInfoRecoil";
import { useRecoilValue } from "recoil";

type OrderFormProps = {
  modalHandler: Function;
  isValidRoom: boolean;
};

const OrderFormMsg: React.FC<OrderFormProps> = ({ modalHandler, isValidRoom }) => {
  const memberInfo = useRecoilValue(memberInfoState);

  const btnClickHandler = (type: string) => {
    if (memberInfo.role == "USER") {
      modalHandler(type, true);
    }
  };

  return (
    <>
      <div className={style.mainBox}>
        <div className={style.title}>주문 유형을 선택해 주세요.</div>
        <div className={style.btnDiv}>
          {isValidRoom ? (
            <>
              <button
                className={style.btn}
                onClick={() => {
                  btnClickHandler("PICKUP");
                }}
              >
                픽업
              </button>
              <button
                className={style.btn}
                onClick={() => {
                  btnClickHandler("DELIVERY");
                }}
              >
                배달
              </button>
            </>
          ) : (
            <>
              <button className={style.disabledBtn}>픽업</button>
              <button className={style.disabledBtn}>배달</button>
            </>
          )}
        </div>
        <div className={style.desc}>배달 주문시 배송비가 발생할 수 있습니다.</div>
      </div>
    </>
  );
};

export default OrderFormMsg;
