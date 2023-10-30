import { atom } from 'recoil';

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
    default: '',
});