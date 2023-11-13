import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useResetRecoilState, useRecoilValue } from "recoil";
import { paymentInfoRecoil } from "@/recoil/paymentRecoil";
import { tokenHttp } from "@/api/chattingTokenHttp";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

const KakaopayApproveMain = () => {
  const router = useRouter();
  const paymentInfo = useRecoilValue(paymentInfoRecoil);
  const resetPaymentInfo = useResetRecoilState(paymentInfoRecoil);

  useEffect(() => {
    // console.log(router.query.pg_token);
    // console.log(paymentInfo.chattingId);
    // console.log(paymentInfo.paymentId);

    const body = {
      chattingId: paymentInfo.chattingId,
      paymentId: paymentInfo.paymentId,
      pgToken: router.query.pg_token,
    };
    tokenHttp
      .post(`/chatting/kakaopay/approve`, body)
      .then((response) => {
        if (response.data.code === 200) {
          router.push(`/chatting/room/${paymentInfo.chattingId}`);
          resetPaymentInfo();

          //요거 필수!! (엑세스 토큰 만료로 재발급 받았다면 바꿔줘!! )
          if (response.headers.authorization) {
            localStorage.setItem("accessToken", response.headers.authorization);
          }
        } else if (response.data.code == "-604") {
          ToastErrorMessage("이미 진행중인 주문이 있습니다.");
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
  }, []);
  return (
    <>
      <div>카카오페이 결제 성공</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { pg_token } = context.query;

    return {
      props: {
        pg_token: pg_token,
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
};

export default KakaopayApproveMain;
