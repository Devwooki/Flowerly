import style from "./style/RequestMsg.module.css";

type RequestMsgProps = {
  isLast: boolean;
  modalHandler: Function;
};

const RequestMsg: React.FC<RequestMsgProps> = ({ isLast, modalHandler }) => {
  return (
    <>
      <div className={style.mainBox}>
        <div className={style.title}>주문서가 도착했습니다.</div>
        <div className={style.btnDiv}>
          {isLast ? (
            <button
              className={style.btn}
              onClick={() => {
                modalHandler("REQUEST", true);
              }}
            >
              주문서 보기
            </button>
          ) : (
            <button className={style.disabledBtn}>주문서 보기</button>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestMsg;
