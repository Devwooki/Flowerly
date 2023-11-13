// type ShopInfo = {
//   reImg: string;
//   shopId: number;
//   shopName: string;
//   shopLoc: string;
//   recommandPrice: string;
//   recommandComment: string;
// };

type markerlist = {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
};

type shopInfo = {
  store: ShopInfoDetail;
  review: review;
};

type ShopInfoDetail = {
  storeInfoId: number;
  storeName: string;
  phoneNumber: string;
  address: string;
  images: string[];
};

type review = {
  content: reviewlist[];
};

type reviewlist = {
  consumerNickName: string;
  createdAt: string;
  content: string;
};

type fllyList = {
  flly: BuyerCard;
  stores: stores;
};

type stores = {
  content: storeContent[];
};

type storeContent = {
  participant: participant;
  storeInfoDto: storeInfoDto;
};

type participant = {
  fllyParticipationId: number;
  imageUrl: string;
  offerPrice: number;
  content: string;
};

type storeInfoDto = {
  storeInfoId: number;
  storeName: string;
  storeNumber: null | number;
  sellerName: string;
  phoneNumber: string;
  address: string;
  member: null | string;
  images: null | string[];
};

type chatRoomBtn = {
  chattingId: number;
  isNew: boolean;
};
