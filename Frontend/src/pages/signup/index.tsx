import React from "react";
import style from "./signup.module.css";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { tempTokenState } from "../../recoil/tokenRecoil";

const Signup = () => {
  const router = useRouter();
  const [tempToken, setTempToken] = useRecoilState(tempTokenState);

  useEffect(() => {
    const token = router.query.token as string;
    if (token) {
      setTempToken(token);
      localStorage.setItem("accessToken", token);
    }
  }, [router.query.token, setTempToken]);

  const onClickBuyer = () => {
    router.push("/signup/buyer");
  };

  const onClickSeller = () => {
    router.push("/signup/seller/step1");
  };
  return (
    <div className={style.back}>
      <div className={style.container}>
        <div className={style.welcomeMent}>
          <h1>환영합니다!</h1>
          <h3>가입하실 유형을 선택해 주세요.</h3>
        </div>
        <div className={style.cardContainer}>
          <div className={style.buyerCard} onClick={() => onClickBuyer()}>
            <div className={style.text}>구매자</div>
          </div>
          <div className={style.sellerCard} onClick={() => onClickSeller()}>
            <div className={style.text}>판매자</div>
          </div>
        </div>
        <div className={style.guideMent}>판매자의 경우 사업자 등록 번호 확인이 필요합니다.</div>
      </div>
    </div>
  );
};

export default Signup;
