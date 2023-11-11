import { atom } from "recoil";

export interface sidoDataType {
  sidoCode: number;
  sidoName: string;
}

export interface sigunguDataType {
  sigunguCode: number;
  sigunguName: string;
}

export interface dongDataType {
  dongCode: number;
  dongName: string;
}

export interface regionType {
  sidoCode: number;
  sigunguCode: number;
  dongCode: number;
}

export const regionState = atom<regionType[]>({
  key: "regionState",
  default: [],
});

export interface bouquetType {
  url: string;
}

export interface flowerCardType {
  flowerCode : number,
  imageUrl:  string,
  flowerName : string,
  color : string,
  engName : string
  meaning : string,
  colorName : string,
}

export interface deliveryAddressType {
  sido: string;
  sigungu: string;
  dong: string;
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

export const randomFlowerState = atom({
  key: "randomFlowerState",
  default: [] as flowerCardType[],
});

export const bouquetsState = atom({
  key: 'bouquetsState',
  // default: [{url:"https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/FlOWER_a531b7ab-1329-4164-96c3-d10898212538"}, {url:"https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/0026c981-2cc8-4abe-b5c1-4a78ab16bfac094_orange_gumuhcho.jpeg.jpeg"}, {url:"https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/FlOWER_a531b7ab-1329-4164-96c3-d10898212538"}, {url:"https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/0026c981-2cc8-4abe-b5c1-4a78ab16bfac094_orange_gumuhcho.jpeg.jpeg"}] as bouquetType[],
  default: [] as bouquetType[],
});

export const bouquetState = atom({
  key: 'bouquetState',
  default: null as bouquetType | null,
});

export const deliveryAddressState = atom<deliveryAddressType>({
  key: "deliveryAddressState",
  default: {
    sido: "",
    sigungu: "",
    dong: "",
  },
});
