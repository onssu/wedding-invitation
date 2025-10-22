"use client";

import { useEffect, useRef, useState } from "react";
import Input from "../ui/Input";
import Button from "@/(components)/ui/Button";

declare global {
  interface Window {
    daum?: any;
    kakao?: any;
  }
}

export default function Postcode() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLInputElement | null>(null);

  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");

  const loadDaumScript = (): Promise<void> =>
    new Promise((resolve, reject) => {
      if (typeof window === "undefined") return reject();
      if (window.daum) return resolve();

      const id = "daum-postcode-script";
      if (document.getElementById(id)) {
        const check = setInterval(() => {
          if (window.daum) {
            clearInterval(check);
            resolve();
          }
        }, 50);
        return;
      }

      const script = document.createElement("script");
      script.id = id;
      script.src =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });

  const loadKakaoScript = (): Promise<void> =>
    new Promise((resolve, reject) => {
      if (typeof window === "undefined") return reject(new Error("SSR"));
      if (window.kakao?.maps?.services) return resolve();

      const id = "kakao-maps-sdk";
      const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY;
      if (!appKey)
        return reject(new Error("Missing NEXT_PUBLIC_KAKAO_APP_JS_KEY"));

      if (document.getElementById(id)) {
        if (window.kakao?.maps && !window.kakao.maps.services) {
          window.kakao.maps.load(() => {
            if (window.kakao?.maps?.services) resolve();
            else reject(new Error("kakao.maps.services not ready"));
          });
        } else {
          const iv = setInterval(() => {
            if (window.kakao?.maps?.services) {
              clearInterval(iv);
              resolve();
            }
          }, 50);
        }
        return;
      }

      const script = document.createElement("script");
      script.id = id;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => {
        if (!window.kakao?.maps) return reject(new Error("kakao.maps missing"));
        window.kakao.maps.load(() => {
          if (window.kakao?.maps?.services) resolve();
          else reject(new Error("kakao.maps.services missing after load"));
        });
      };
      script.onerror = () => reject(new Error("Failed to load Kakao SDK"));
      document.head.appendChild(script);
    });

  const getAddressCoords = async (address: string) => {
    if (!window.kakao?.maps?.services)
      throw new Error("Kakao Maps SDK not ready");

    const geocoder = new window.kakao.maps.services.Geocoder();

    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      geocoder.addressSearch(address, (result: any[], status: string) => {
        if (!status)
          return reject(new Error("Geocoder callback did not return status"));

        if (status === window.kakao.maps.services.Status.OK && result?.[0]) {
          const lng = parseFloat(result[0].x);
          const lat = parseFloat(result[0].y);
          console.log("lat, lng:", lat, lng);
          resolve({ lat, lng });
        } else {
          reject(new Error(`Geocode failed: status=${status}`));
        }
      });
    });
  };

  const openPostcode = async () => {
    try {
      await loadDaumScript();
      await loadKakaoScript();

      if (!wrapRef.current) return;
      const element_wrap = wrapRef.current;

      const currentScroll = Math.max(
        document.body.scrollTop,
        document.documentElement.scrollTop
      );

      new window.daum.Postcode({
        oncomplete: async function (data: any) {
          const addr =
            data.userSelectedType === "R"
              ? data.roadAddress
              : data.jibunAddress;
          let extraAddr = "";

          if (data.userSelectedType === "R") {
            if (data.bname && /[동|로|가]$/g.test(data.bname))
              extraAddr += data.bname;
            if (data.buildingName && data.apartment === "Y")
              extraAddr += extraAddr
                ? `, ${data.buildingName}`
                : data.buildingName;
            if (extraAddr) extraAddr = ` (${extraAddr})`;
          }

          setExtraAddress(extraAddr);
          setPostcode(data.zonecode || "");
          setAddress(addr);

          const coords = await getAddressCoords(addr);
          console.log("좌표 결과:", coords);

          setTimeout(() => detailRef.current?.focus(), 50);
          element_wrap.style.display = "none";
          document.body.scrollTop = currentScroll;
        },
        onresize: (size: any) => {
          if (wrapRef.current)
            wrapRef.current.style.height = `${size.height}px`;
        },
        width: "100%",
        height: "100%",
      }).embed(element_wrap);

      element_wrap.style.display = "block";
    } catch (err) {
      console.error("Daum postcode or Kakao SDK load failed", err);
    }
  };

  useEffect(() => {
    if (wrapRef.current) wrapRef.current.style.display = "none";
  }, []);

  return (
    <div>
      <div className="flex direction-row gap-2">
        <Input value={address} disabled />
        <Button onClick={openPostcode} label="우편번호 찾기" />
      </div>

      <div
        id="wrap"
        ref={wrapRef}
        style={{
          display: "none",
          border: "1px solid",
          width: "100%",
          height: "300px",
          margin: "5px 0",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={() => (wrapRef.current!.style.display = "none")}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: 0,
            top: -1,
            zIndex: 1,
            background: "transparent",
            border: "none",
            padding: 4,
          }}
          aria-label="닫기"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
