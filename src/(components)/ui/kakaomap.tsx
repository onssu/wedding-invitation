"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Kakaomap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 스크립트가 이미 있으면 중복 추가 방지
    if (document.getElementById("kakao-map-script")) return;

    const script = document.createElement("script");

    script.id = "kakao-map-script";
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=aa1fc59a611abb0428f224e927bac202&autoload=false";
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          new window.kakao.maps.Map(mapRef.current, options);

          // 마커가 표시될 위치입니다
          const markerPosition = new window.kakao.maps.LatLng(
            33.450701,
            126.570667
          );

          // 마커를 생성합니다
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
        }
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div ref={mapRef} id="map" style={{ width: "100%", height: "400px" }} />
  );
}
