import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const guests = pgTable("guests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  message: text("message"),
  attending: boolean("attending").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
