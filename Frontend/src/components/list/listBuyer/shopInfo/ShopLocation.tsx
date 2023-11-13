import React, { useEffect, useState } from "react";
import style from "./ShopLocation.module.css";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type ShopLocationProps = {
  ShopInfoDetail: ShopInfoDetail;
};

const ShopLocation = ({ ShopInfoDetail }: ShopLocationProps) => {
  const [info, setInfo] = useState<markerlist>();
  const [markers, setMarkers] = useState<markerlist[]>([]);
  const [map, setMap] = useState<any>();
  const [location, setLocation] = useState<string>();

  useEffect(() => {
    // 주소 처리를 위한 useEffect
    const splitT = ShopInfoDetail.address.indexOf("T");
    setLocation(ShopInfoDetail.address.substring(0, splitT));
  }, [ShopInfoDetail.address]);

  useEffect(() => {
    // `location` 상태를 사용하여 API 호출을 위한 useEffect
    if (!map || !location) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(location, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: parseFloat(data[i].y),
              lng: parseFloat(data[i].x),
            },
            content: data[i].place_name,
          });
          bounds.extend(new kakao.maps.LatLng(parseFloat(data[i].y), parseFloat(data[i].x)));
        }
        setMarkers(markers);
        [];
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      } else {
        console.log("위치 검색 실패");
      }
    });
  }, [map, location]);

  return (
    <div className={style.locationMain}>
      <Map
        center={{ lat: 37.3024115, lng: 126.3864649 }}
        className={style.mapRender}
        level={4}
        draggable={false}
        onCreate={setMap}
      >
        {/* <MapMarker
          position={{ lat: 36.3478603, lng: 127.3938198 }}
          image={{
            src: "/img/icon/floPin.png",
            size: { width: 50, height: 50 },
            options: { offset: { x: 10, y: 40 } },
          }}
        /> */}
        {markers.length > 0 && (
          <MapMarker
            key={`marker-${markers[0].content}-${markers[0].position.lat},${markers[0].position.lng}`}
            position={markers[0].position}
            onClick={() => setInfo(markers[0])}
            image={{
              src: "/img/icon/floPin.png",
              size: { width: 50, height: 50 },
              options: { offset: { x: 10, y: 40 } },
            }}
          >
            {info && info.content === markers[0].content && (
              <div style={{ color: "#000" }}>{markers[0].content}</div>
            )}
          </MapMarker>
        )}
      </Map>
      <div className={style.shopInfoText}>
        <div className={style.shopName}>{ShopInfoDetail.storeName}</div>
        <div className={style.shopLoc}>{ShopInfoDetail && location}</div>
      </div>
    </div>
  );
};

export default ShopLocation;
