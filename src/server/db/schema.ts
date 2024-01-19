import { bigint, mysqlTableCreator, varchar } from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const tableName = (name: string) => `next-starter_${name}`;
export const mysqlTable = mysqlTableCreator(tableName);

export const user = mysqlTable("user", {
  id: varchar("id", { length: 15 }).primaryKey(),
  // other user attributes
  first_name: varchar("first_name", { length: 255 }),
  last_name: varchar("last_name", { length: 255 }),
  email_name: varchar("email", { length: 255 }),
});

export const key = mysqlTable("user_key", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 15 }).notNull(),
  hashedPassword: varchar("hashed_password", { length: 255 }),
});

export const session = mysqlTable("user_session", {
  id: varchar("id", { length: 127 }).primaryKey(),
  userId: varchar("user_id", { length: 15 }).notNull(),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});
