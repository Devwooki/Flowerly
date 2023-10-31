import { atom } from 'recoil';

export interface flowerCardType {
  id : Number,
  img_url : string,
  flower_name : string,
  flower_meaning : string[],
}

export interface bouquetType {
  url : string,
  base64 : string
}

export const situationState = atom({
  key: 'situationState',
  default: '',
});

export const targetState = atom({
    key: 'targetState',
    default: '',
});

export const colorState = atom({
    key: 'colorState',
    default: [] as string[],
});

export const flowerState = atom({
  key: 'flowerState',
  default: [] as flowerCardType[],
})

export const bouquetState = atom({
  key: 'bouquetState',
  default: [] as bouquetType[],
})