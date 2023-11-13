import { atom } from "recoil";
//새로고침해도 정보 유지할려면 persist써야함
import { recoilPersist } from "recoil-persist";

const isBrowser = typeof window !== "undefined";
const sessionStorage = isBrowser ? window.sessionStorage : undefined;

//리코일 정보를 세션에 저장
const { persistAtom: persistAtomSession } = recoilPersist({
  key: "recoil-persist-session",
  storage: sessionStorage,
});

//Recoil-persist를 적용시키려면 아래의 effects_UNSTABLE을 적어주어야 한다.
export const paymentInfoRecoil = atom({
  key: "paymentInfoRecoil",
  default: {
    chattingId: "",
    paymentId: "",
  },
  effects_UNSTABLE: [persistAtomSession],
});

export const paymentErrorRecoil = atom({
  key: "paymentErrorRecoil",
  default: {
    isError: false,
    chattingId: "",
    errorMsg: "",
  },
  effects_UNSTABLE: [persistAtomSession],
});
