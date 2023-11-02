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

type BuyerCardPlus = BuyerCard & {
  budget: number;
  deadline: string;
  clientName: string;
  selectedFlower: string[];
  orderType: string;
  adress: string;
  request: string;
};
