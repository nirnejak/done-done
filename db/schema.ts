import {
  pgTable,
  serial,
  varchar,
  text,
  date,
  integer,
  boolean,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", (u) => ({
  id: u.serial("id").primaryKey(),
  name: u.varchar("name", { length: 255 }).notNull(),
  email: u.varchar("email", { length: 255 }).notNull(),
  password: u.text("password").notNull(),
}))

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  dueDate: date("due_date"),
  isCompleted: boolean("is_completed").default(false),
})
