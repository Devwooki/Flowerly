import { useRouter } from "next/router";
import style from "./style/ChattingListExitModal.module.css";
import { tokenHttp } from "@/api/tokenHttp";

type ChattingListExitModalProps = {
  chattingId: number;
  modalHandler: Function;
  axiosHandler: Function;
};

const ChattingListExitModal: React.FC<ChattingListExitModalProps> = ({
  chattingId,
  modalHandler,
  axiosHandler,
}) => {
  const router = useRouter();

  const removeChatting = () => {
    tokenHttp
      .delete(`/chatting/${chattingId}`)
      .then((response) => {
        if (response.data.code === 200) {
          axiosHandler();
          //요거 필수!! (엑세스 토큰 만료로 재발급 받았다면 바꿔줘!! )
          if (response.headers.authorization) {
            localStorage.setItem("accessToken", response.headers.authorization);
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
        }
      });
  };

  return (
    <>
      <div className={style.checkBack}>
        <div className={style.modalBack}>
          <div>채팅방을 나가시겠습니까?</div>
          <div className={style.modalBtnBox}>
            <div
              onClick={() => {
                modalHandler(chattingId, false);
              }}
            >
              취소
            </div>
            <div
              onClick={() => {
                removeChatting();
                modalHandler(chattingId, false);
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

export default ChattingListExitModal;
