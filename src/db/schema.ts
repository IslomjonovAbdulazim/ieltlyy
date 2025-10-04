import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Auth tables for better-auth
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

// Tests tables
export const tests = sqliteTable('tests', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type').notNull(),
  duration: integer('duration').notNull(),
  totalMarks: integer('total_marks').notNull(),
  createdAt: text('created_at').notNull(),
});

export const testParts = sqliteTable('test_parts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  testId: integer('test_id').references(() => tests.id),
  partNumber: integer('part_number').notNull(),
  title: text('title').notNull(),
  instructions: text('instructions'),
  content: text('content'),
  audioUrl: text('audio_url'),
  listeningScript: text('listening_script'),
});

export const questions = sqliteTable('questions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  partId: integer('part_id').references(() => testParts.id),
  questionNumber: integer('question_number').notNull(),
  questionText: text('question_text').notNull(),
  questionType: text('question_type').notNull(),
  options: text('options', { mode: 'json' }),
  correctAnswer: text('correct_answer'),
  marks: integer('marks').notNull(),
});

// Payme payment integration tables
export const paymeOrders = sqliteTable('payme_orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  productId: text('product_id').notNull(),
  amount: integer('amount').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const paymeTransactions = sqliteTable('payme_transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  paymeTransactionId: text('payme_transaction_id').notNull().unique(),
  orderId: text('order_id').notNull(),
  amount: integer('amount').notNull(),
  state: integer('state').notNull(),
  createTime: integer('create_time').notNull(),
  performTime: integer('perform_time'),
  cancelTime: integer('cancel_time'),
  reason: integer('reason'),
  createdAt: text('created_at').notNull(),
});