// type BuyerCard = {
//   fllyId: number;
//   state: string;
//   img: string;
//   situation: string;
//   target: string;
//   selectedColor: string[];
//   shopName: string;
// };

type BuyerCardStong = {
  card: BuyerCard;
};

type BuyerCard = {
  budget: number;
  color1: string | null;
  color2: string | null;
  color3: string | null;
  consumer: string;
  deadline: string;
  fllyId: number;
  flower1: {
    flowerName: string;
    meaning: string;
  };
  flower2: {
    flowerName: string;
    meaning: string;
  };
  flower3: {
    flowerName: string;
    meaning: string;
  };
  imageUrl: string;
  orderType: string;
  progress: string;
  requestAddress: string | null;
  requestContent: string;
  situation: string;
  target: string;
};

// type BuyerCardList = {
//   BuyerCard: BuyerCard[];
// };
