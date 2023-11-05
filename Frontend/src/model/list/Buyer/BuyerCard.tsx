type BuyerCard = {
  fllyId: number;
  state: string;
  img: string;
  situation: string;
  target: string;
  selectedColor: string[];
  shopName: string;
};

type BuyerCardStong = {
  card: BuyerCard;
};

type BuyerCardPlus = {
  state: string;
  img: string;
  situation: string;
  selectedColor: string[];
  budget: string;
  deadline: string;
  clientName: string;
  selectedFlower: string[];
  orderType: string;
  adress: string;
  request: string;
};
