type ShopInfo = {
  reImg: string;
  shopId: number;
  shopName: string;
  shopLoc: string;
  recommandPrice: string;
  recommandComment: string;
};

type ShopInfoDetail = ShopInfo & {
  shopX: number;
  shopY: number;
};
