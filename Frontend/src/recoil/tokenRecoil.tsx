import { atom } from "recoil";

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

export const sellerInputState = atom({
  key: "sellerInputState",
  default: {
    storename: "",
    sellername: "",
    phonenumber: "",
    auth: "",
    address: "",
  },
});
