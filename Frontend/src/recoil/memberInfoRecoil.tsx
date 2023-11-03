import { atom } from "recoil";

export interface MemberInfo {
  id: number;
  socialId: string;
  nickName: string;
  email: string;
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
  member: Omit<MemberInfo, "store">;
  images: string[];
}

// 판매자와 구매자의 데이터를 통합한 타입
export type UserInfo = MemberInfo | StoreInfo;

export const memberInfoState = atom<UserInfo | null>({
  key: "memberInfoState",
  default: null,
});
