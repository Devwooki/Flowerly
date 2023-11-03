import { atom } from "recoil";

export interface flowerCardType {
  flowerCode : number,
  imageUrl:  string,
  flowerName : string,
  color : string,
  engName : string
  meaning : string,
}

export interface bouquetType {
  url: string | undefined;
}

export const situationState = atom({
  key: "situationState",
  default: "",
});

export const targetState = atom({
  key: "targetState",
  default: "",
});

export const colorState = atom({
  key: "colorState",
  default: [] as string[],
});

export const flowerState = atom({
  key: "flowerState",
  default: [] as flowerCardType[],
});

export const bouquetsState = atom({
  key: 'bouquetsState',
  // default: [{url:""}, {url:""}] as bouquetType[],
  default: [] as bouquetType[],
});

export const bouquetState = atom({
  key: 'bouquetState',
  default: { url: "" } as bouquetType,
});
