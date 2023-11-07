import { atom } from "recoil";

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

export const memberInfoState = atom<MemberInfo | null>({
  key: "memberInfoState",
  default: null,
});
