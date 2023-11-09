import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface MemberInfo {
  id: number;
  socialId: string;
  nickName: string;
  email: string;
  role: string; // role 추가
  store?: StoreInfo | null;
  notification: boolean;
}

export interface StoreInfo {
  storeInfoId: number;
  storeName: string;
  storeNumber: string;
  sellerName: string;
  phoneNumber: string;
  address: string;
  images: string[];
}

const { persistAtom } = recoilPersist({
  key: "fllyMemberInfo",
  storage: sessionStorage,
});

export const memberInfoState = atom<MemberInfo>({
  key: "memberInfoState",
  default: {
    id: 0,
    socialId: "",
    nickName: "",
    email: "",
    role: "", // role 추가
    store: null,
    notification: false,
  },
  effects_UNSTABLE: [persistAtom],
});
