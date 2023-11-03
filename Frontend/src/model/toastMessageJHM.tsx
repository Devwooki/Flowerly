import { toast } from "react-toastify";
export const UserInfoExpires = () =>
  toast.warning(`로그인이 만료되어 로그아웃 되었습니다`, {
    autoClose: 1000, // 메시지를 자동으로 닫을 시간 (밀리초)
    hideProgressBar: true,
<<<<<<< Updated upstream
    position: toast.POSITION.TOP_CENTER,
=======
>>>>>>> Stashed changes
  });

export const UserNotLogin = () =>
  toast.warning(`로그인시 사용가능합니다`, {
    autoClose: 1000, // 메시지를 자동으로 닫을 시간 (밀리초)
    hideProgressBar: true,
<<<<<<< Updated upstream
    position: toast.POSITION.TOP_CENTER,
=======
>>>>>>> Stashed changes
  });

export const ToastSuccessMessage = (message: string) => {
  toast.success(message, {
    autoClose: 1000, // 메시지를 자동으로 닫을 시간 (밀리초)
    hideProgressBar: true,
<<<<<<< Updated upstream
    position: toast.POSITION.TOP_CENTER,
=======
>>>>>>> Stashed changes
  });
};

export const ToastErrorMessage = (message: string) => {
  toast.error(message, {
    autoClose: 1000, // 메시지를 자동으로 닫을 시간 (밀리초)
    hideProgressBar: true,
<<<<<<< Updated upstream
    position: toast.POSITION.TOP_CENTER,
=======
>>>>>>> Stashed changes
  });
};
