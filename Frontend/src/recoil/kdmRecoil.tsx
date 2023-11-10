import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const isBrowser = typeof window !== "undefined";
const sessionStorage = isBrowser ? window.sessionStorage : undefined;

const { persistAtom: persistAtomSession } = recoilPersist({
  key: "fllySession",
  storage: sessionStorage,
});

//Recoil-persist를 적용시키려면 아래의 effects_UNSTABLE을 적어주어야 한다.
export const FllylistDiscRecoil = atom<BuyerCard>({
  key: "FllylistDiscRecoil",
  default: {
    budget: 0,
    color1: null,
    color2: null,
    color3: null,
    consumer: "",
    deadline: "",
    fllyId: 0,
    flower1: {
      flowerName: "",
      meaning: "",
    },
    flower2: {
      flowerName: "",
      meaning: "",
    },
    flower3: {
      flowerName: "",
      meaning: "",
    },
    imageUrl: "",
    orderType: "",
    progress: "",
    requestAddress: "",
    requestContent: "",
    situation: "",
    target: "",
  },
  effects_UNSTABLE: [persistAtomSession],
});
