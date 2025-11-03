import {
  pgTable,
  serial,
  varchar,
  text,
  real,
  jsonb,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const weddingDatas = pgTable("wedding_datas", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  bride: varchar("bride", { length: 50 }).notNull(),
  groom: varchar("groom", { length: 50 }).notNull(),

  date: varchar("date", { length: 20 }).notNull(),
  time: varchar("time", { length: 20 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),

  lat: real("lat"),
  lng: real("lng"),

  message: text("message"),

  brideFater: varchar("bride_fater", { length: 50 }),
  brideMother: varchar("bride_mother", { length: 50 }),
  groomFater: varchar("groom_fater", { length: 50 }),
  groomMother: varchar("groom_mother", { length: 50 }),

  galleryItems: jsonb("gallery_items").$type<string[]>(),
  info: text("info"),

  createdAt: timestamp("created_at").defaultNow(),
});
