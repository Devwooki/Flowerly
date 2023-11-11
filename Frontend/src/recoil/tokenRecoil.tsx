import { atom } from "recoil";

export interface sellerInputType {
  storename: string;
  sellername: string;
  phonenumber: string;
  storenumber: string;
  address: string;
}

export interface sellerAddressType {
  sido: string;
  sigungu: string;
  dong: string;
}

export interface buyerInputType {
  nickname: string;
}

export interface storeDeliveryRegionType {
  sidoCode: number;
  sigunguCode: number;
  dongCode: number;
}

export const storeDeliveryRegionState = atom<storeDeliveryRegionType[]>({
  key: "storeDeliveryRegionState",
  default: [],
});

export const sellerDeliveryRegionState = atom<string[]>({
  key: "sellerDeliveryRegionState",
  default: [],
});

export const tempTokenState = atom<string>({
  key: "tempTokenState",
  default: "",
});

export const buyerInputState = atom<buyerInputType>({
  key: "buyerInputState",
  default: {
    nickname: "",
  },
});

export const sellerInputState = atom<sellerInputType>({
  key: "sellerInputState",
  default: {
    storename: "",
    sellername: "",
    phonenumber: "",
    storenumber: "",
    address: "",
  },
});

export const sellerAddressState = atom<sellerAddressType>({
  key: "sellerAddressState",
  default: {
    sido: "",
    sigungu: "",
    dong: "",
  },
});
