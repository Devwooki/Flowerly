import style from "./RequestMsg.module.css";

type RequestMsgProps = {
  modalHandler: Function;
};

const RequestMsg: React.FC<RequestMsgProps> = ({ modalHandler }) => {
  return (
    <>
      <div className={style.mainBox}>
        <div className={style.title}>주문서가 도착했습니다.</div>
        <div className={style.btnDiv}>
          <button
            className={style.btn}
            onClick={() => {
              modalHandler("REQUEST", true);
            }}
          >
            주문서 보기
          </button>
        </div>
      </div>
    </>
  );
};

export default RequestMsg;
