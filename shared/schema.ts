import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Guestbook table
export const guestbookEntries = pgTable("guestbook_entries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  message: text("message").notNull(),
  signature: text("signature"), // Base64 encoded drawing data
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertGuestbookSchema = createInsertSchema(guestbookEntries).pick({
  name: true,
  message: true,
  signature: true,
});

export type InsertGuestbookEntry = z.infer<typeof insertGuestbookSchema>;
export type GuestbookEntry = typeof guestbookEntries.$inferSelect;
