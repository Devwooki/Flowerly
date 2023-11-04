import { log } from "console";
import React, { useEffect } from "react";
import style from "./ShopLocation.module.css";
import { Map, MapMarker, StaticMap } from "react-kakao-maps-sdk";

type ShopLocationProps = {
  shopInfo: ShopInfoDetail;
};

const ShopLocation = ({ shopInfo }: ShopLocationProps) => {
  return (
    <div className={style.locationMain}>
      <Map
        center={{ lat: 36.3478603, lng: 127.3938198 }}
        className={style.mapRender}
        level={4}
        draggable={false}
      >
        <MapMarker
          position={{ lat: 36.3478603, lng: 127.3938198 }}
          image={{
            src: "/img/icon/floPin.png",
            size: { width: 50, height: 50 },
            options: { offset: { x: 10, y: 40 } },
          }}
        />
      </Map>
      <div className={style.shopInfoText}>
        <div className={style.shopName}>{shopInfo.shopName}</div>
        <div className={style.shopLoc}>{shopInfo.shopLoc}</div>
      </div>
    </div>
  );
};

export default ShopLocation;
