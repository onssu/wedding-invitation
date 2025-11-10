"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Kakaomap({ lat, lng }: { lat: number; lng: number }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 스크립트가 이미 있으면 중복 추가 방지
    if (document.getElementById("kakao-map-script")) return;

    const script = document.createElement("script");

    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY;

    script.id = "kakao-map-script";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3,
          };
          new window.kakao.maps.Map(mapRef.current, options);

          // 마커가 표시될 위치입니다
          const markerPosition = new window.kakao.maps.LatLng(lat, lng);

          // 마커를 생성합니다
          new window.kakao.maps.Marker({
            position: markerPosition,
          });
        }
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div
      data-reveal
      ref={mapRef}
      id="map"
      style={{ width: "100%", height: "400px" }}
    />
  );
}
