import { ToastSuccessMessage } from "@/model/toastMessageJHM";
import style from "./style/ReportModal.module.css";
import Image from "next/image";

type ReportModalProps = {
  memberName: string | null;
  modalHandler: Function;
};

const ReportModal: React.FC<ReportModalProps> = ({ memberName, modalHandler }) => {
  return (
    <>
      <div className={style.checkBack}>
        <div className={style.modalBack}>
          <div className={style.contentDiv}>
            <div>
              <Image
                className={style.icon}
                src="/img/icon/report-warning.png"
                width={30}
                height={30}
                alt="주문 양식"
              />
            </div>
            <div>
              {memberName ? memberName + " 님을" : "사용자를"} <br></br>신고하시겠습니까?
            </div>
          </div>
          <div className={style.modalBtnBox}>
            <div
              onClick={() => {
                modalHandler("REPORT", false);
              }}
            >
              취소
            </div>
            <div
              onClick={() => {
                ToastSuccessMessage("신고 완료하였습니다.");
                modalHandler("REPORT", false);
              }}
            >
              확인
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
