declare interface FormDataType {
  seq?: string;
  id: number;

  bride: string;
  groom: string;

  date: string;
  time: string;
  location: string;
  mainImageUrl: string;

  lat: number;
  lng: number;

  message: string;

  // --- 표시 숨김 옵션 ---
  hidePrants: boolean;
  hideBrideFater: boolean;
  hideBrideMother: boolean;
  hideGroomFater: boolean;
  hideGroomMother: boolean;

  // --- 부모님 정보 ---
  brideFater: string;
  brideMother: string;
  groomFater: string;
  groomMother: string;

  // --- 갤러리 이미지 ---
  galleryItems: string[];

  // --- 안내 문구 ---
  info: string;

  // --- 연락처 목록 ---
  contacts: {
    groomSide: { name: string; relation: string; phone: string }[];
    brideSide: { name: string; relation: string; phone: string }[];
  };

  // --- 계좌 목록 ---
  accountGroups: {
    id: "groom" | "bride";
    title: string;
    items: { name: string; bank: string; account: string }[];
  }[];

  // --- 작성/수정 정보 (선택적) ---
  createdAt?: string;
  createdBy?: number | null;
  updatedAt?: string;
  updatedBy?: number | null;
}
