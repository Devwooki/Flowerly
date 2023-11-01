import { atom } from "recoil";

export const fllylistDisc = atom<BuyerCard>({
  key: "fllylistDisc",
  default: {
    fllyId: 0,
    state: "",
    img: "",
    situation: "",
    target: "",
    selectedColor: [],
    shopName: "",
  },
});
