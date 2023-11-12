import React from "react";
import { tokenHttp } from "@/api/tokenHttp";
import { sellerDeliveryRegionState, storeDeliveryRegionState } from "@/recoil/tokenRecoil";

const DeliveryAreaChange = () => {
  // api로 서버에서 데이터 조회

  //storeDeliveryRegionState에 update
  // 이미 선택되어 있어야 하고, 선택된 지역은 다른 색으로 표시되어야 함
  // 선택된 지역은 삭제할 수 있어야 함
  // 선택된 지역은 문자열로 표시되어야 함-sellerDeliveryRegionState 활용

  // 수정 버튼을 누르면 수정하는 api 호출

  // 이때 수정하는 api는 storeDeliveryRegionState와 sellerDeliveryRegionState에 update된 데이터를 보내줘야함
  return (
    <>
      <div>배달 가능 지역 변경</div>
    </>
  );
};

export default DeliveryAreaChange;
