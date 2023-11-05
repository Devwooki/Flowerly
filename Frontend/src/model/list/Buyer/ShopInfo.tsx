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
