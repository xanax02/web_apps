import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const workspace = pgTable("workspace", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("createdAt", {
    withTimezone: true,
    mode: "string",
  }),
  workspaceOwner: text("workspace_owner").notNull(),
  title: text("title").notNull(),
  iconId: text("icon_id").notNull(),
  data: text("data"),
  inTrash: text("in_trash"),
  logo: text("logo"),
  bannerUrl: text("baner_url"),
});
