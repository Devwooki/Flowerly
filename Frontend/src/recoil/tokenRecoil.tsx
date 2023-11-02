import { atom } from "recoil";

export interface sellerInputType {
  storename: string;
  sellername: string;
  phonenumber: string;
  storenumber: string;
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
    storenumber: "",
    address: "",
  },
});
