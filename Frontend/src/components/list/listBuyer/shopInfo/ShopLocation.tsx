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

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      `${ShopInfoDetail.shopLoc} ${ShopInfoDetail.shopName}`,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];
          console.log(data);

          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: parseFloat(data[i].y),
                lng: parseFloat(data[i].x),
              },
              content: data[i].place_name,
            });
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정
          map.setBounds(bounds);
        }
      },
    );
  }, [map, ShopInfoDetail.shopLoc, ShopInfoDetail.shopName]);

  return (
    <div className={style.locationMain}>
      <Map
        center={{ lat: 37.3034118, lng: 127.3864649 }}
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
        <div className={style.shopName}>{ShopInfoDetail.shopName}</div>
        <div className={style.shopLoc}>{ShopInfoDetail.shopLoc}</div>
      </div>
    </div>
  );
};

export default ShopLocation;
