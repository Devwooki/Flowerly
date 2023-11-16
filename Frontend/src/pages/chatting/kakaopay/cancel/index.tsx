import { useEffect } from "react";
import { useRouter } from "next/router";
import { paymentInfoRecoil, paymentErrorRecoil } from "@/recoil/paymentRecoil";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

const KakaopayCancelMain = () => {
  const paymentInfo = useRecoilValue(paymentInfoRecoil);
  const resetPaymentInfo = useResetRecoilState(paymentInfoRecoil);
  const setPaymentError = useSetRecoilState(paymentErrorRecoil);
  const router = useRouter();

  useEffect(() => {
    setPaymentError({
      isError: true,
      chattingId: paymentInfo.chattingId,
      errorMsg: "카카오페이 결제를 취소하였습니다.",
    });
    router.push(`/chatting/room/${paymentInfo.chattingId}`);
    resetPaymentInfo();
  });

  return (
    <>
      <div>카카오페이 결제 취소</div>
    </>
  );
};

export default KakaopayCancelMain;
