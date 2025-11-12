import {
  pgTable,
  serial,
  varchar,
  text,
  real,
  jsonb,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const weddingDatas = pgTable("wedding_datas", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  mainImageUrl: varchar("main_image_url", { length: 255 }),

  bride: varchar("bride", { length: 50 }).notNull(),
  groom: varchar("groom", { length: 50 }).notNull(),

  date: varchar("date", { length: 20 }).notNull(),
  time: varchar("time", { length: 20 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),

  lat: real("lat"),
  lng: real("lng"),

  message: text("message"),

  // --- 표시 숨김 옵션 ---
  hidePrants: boolean("hide_parents").notNull().default(false),
  hideBrideFater: boolean("hide_bride_fater").notNull().default(false),
  hideBrideMother: boolean("hide_bride_mother").notNull().default(false),
  hideGroomFater: boolean("hide_groom_fater").notNull().default(false),
  hideGroomMother: boolean("hide_groom_mother").notNull().default(false),

  // --- 부모님 정보 ---
  brideFater: varchar("bride_fater", { length: 50 }),
  brideMother: varchar("bride_mother", { length: 50 }),
  groomFater: varchar("groom_fater", { length: 50 }),
  groomMother: varchar("groom_mother", { length: 50 }),

  // --- 갤러리 이미지 ---
  galleryItems: jsonb("gallery_items").$type<string[]>().notNull().default([]),

  // --- 안내 문구 ---
  info: text("info"),

  // --- 연락처 목록 (신랑/신부측) ---
  contacts: jsonb("contacts")
    .$type<{
      groomSide: { name: string; relation: string; phone: string }[];
      brideSide: { name: string; relation: string; phone: string }[];
    }>()
    .notNull()
    .default({
      groomSide: [],
      brideSide: [],
    }),

  // --- 계좌 목록 (신랑측 / 신부측 그룹화) ---
  accountGroups: jsonb("account_groups")
    .$type<
      {
        id: "groom" | "bride";
        title: string;
        items: { name: string; bank: string; account: string }[];
      }[]
    >()
    .notNull()
    .default([]),

  // --- 생성/수정 로그 ---
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").references(() => users.id, {
    onDelete: "set null",
  }),
  updatedAt: timestamp("updated_at").defaultNow(),
  updatedBy: integer("updated_by").references(() => users.id, {
    onDelete: "set null",
  }),
});

export const weddingGuestbooks = pgTable("wedding_guestbooks", {
  id: serial("id").primaryKey(),

  // 어떤 청첩장(wedding_datas)에 속하는 방명록인지
  weddingId: integer("wedding_id")
    .notNull()
    .references(() => weddingDatas.id, { onDelete: "cascade" }),

  // 작성자 이름 (비회원도 가능)
  name: varchar("name", { length: 50 }).notNull(),

  // 방명록 내용
  message: text("message").notNull(),

  // 작성일
  createdAt: timestamp("created_at").defaultNow(),
});
