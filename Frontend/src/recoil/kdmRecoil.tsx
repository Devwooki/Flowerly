import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const isBrowser = typeof window !== "undefined";
const sessionStorage = isBrowser ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "fllySession",
  storage: sessionStorage,
});

//Recoil-persist를 적용시키려면 아래의 effects_UNSTABLE을 적어주어야 한다.
export const FllylistDiscRecoil = atom<BuyerCard>({
  key: "FllylistDiscRecoil",
  default: {
    fllyId: 0,
    state: "",
    img: "",
    situation: "",
    target: "",
    selectedColor: [],
    shopName: "",
  },
  effects_UNSTABLE: [persistAtom],
});
