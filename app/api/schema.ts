import {
  mysqlTable,
  serial,
  varchar,
  text,
  date,
  int,
} from "drizzle-orm/mysql-core"

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").notNull(),
})

export const todos = mysqlTable("todos", {
  id: serial("id").primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  due_date: date("due_date"),
})
