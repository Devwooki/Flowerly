type ShopInfo = {
  reImg: string;
  shopId: number;
  shopName: string;
  shopLoc: string;
  recommandPrice: string;
  recommandComment: string;
};

type ShopInfoDetail = {
  shopName: string;
  shopLoc: string;
  shopImg: string[];
};

type markerlist = {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
};

type review = {
  userName: string;
  reviewTime: string;
  reviewContent: string;
};

/* 현욱이가 준 값 */

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
