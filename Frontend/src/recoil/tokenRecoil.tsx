import { atom } from "recoil";

export interface sellerInputType {
  storename: string;
  sellername: string;
  phonenumber: string;
  auth: number;
  address: string;
}

export const tempTokenState = atom({
  key: "tempTokenState",
  default: "",
});

export const buyerInputState = atom({
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
    auth: 0,
    address: "",
  },
});
