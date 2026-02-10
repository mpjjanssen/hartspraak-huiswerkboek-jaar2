import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, longtext } from "drizzle-orm/mysql-core";

/**
 * Verified members who are allowed to register
 * Admin adds members to this table via admin portal
 */
export const verifiedMembers = mysqlTable("verified_members", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  status: mysqlEnum("status", ["active", "disabled"]).default("active").notNull(),
  addedBy: varchar("addedBy", { length: 320 }), // Admin email who added this member
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VerifiedMember = typeof verifiedMembers.$inferSelect;
export type InsertVerifiedMember = typeof verifiedMembers.$inferInsert;

/**
 * Registered user accounts (members who have created accounts)
 * Separate from OAuth users table
 */
export const authUsers = mysqlTable("auth_users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  verifiedMemberId: int("verifiedMemberId").notNull(), // Links to verified_members table
  status: mysqlEnum("status", ["active", "disabled"]).default("active").notNull(),
  shareConsent: boolean("shareConsent").default(false), // Whether user consents to share answers with team
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn"),
});

export type AuthUser = typeof authUsers.$inferSelect;
export type InsertAuthUser = typeof authUsers.$inferInsert;

/**
 * Admin accounts (only info@hartspraak.com)
 * Separate authentication from regular members
 */
export const admins = mysqlTable("admins", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn"),
});

export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = typeof admins.$inferInsert;

/**
 * Password reset tokens for members
 */
export const passwordResetTokens = mysqlTable("password_reset_tokens", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  used: boolean("used").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type InsertPasswordResetToken = typeof passwordResetTokens.$inferInsert;

/**
 * Legacy OAuth users table (kept for compatibility, not used for new auth)
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User answers to workshop questions (client-side encrypted)
 */
export const userAnswers = mysqlTable("user_answers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // References auth_users.id
  workshopId: varchar("workshopId", { length: 50 }).notNull(), // e.g., "workshop1"
  questionId: varchar("questionId", { length: 100 }).notNull(), // e.g., "q1-moment1"
  answerEncrypted: text("answerEncrypted").notNull(), // Encrypted answer content
  encryptionIv: varchar("encryptionIv", { length: 255 }).notNull(), // Initialization vector for decryption
  answerPlaintext: text("answerPlaintext"), // Plaintext copy when user has shareConsent enabled
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserAnswer = typeof userAnswers.$inferSelect;
export type InsertUserAnswer = typeof userAnswers.$inferInsert;

/**
 * AI conversations per question (client-side encrypted)
 */
export const aiConversations = mysqlTable("ai_conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // References auth_users.id
  workshopId: varchar("workshopId", { length: 50 }).notNull(),
  questionId: varchar("questionId", { length: 100 }).notNull(),
  messagesEncrypted: text("messagesEncrypted").notNull(), // Encrypted JSON array of messages
  encryptionIv: varchar("encryptionIv", { length: 255 }).notNull(),
  messageCount: int("messageCount").default(0).notNull(), // Metadata: number of messages (not encrypted)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AiConversation = typeof aiConversations.$inferSelect;
export type InsertAiConversation = typeof aiConversations.$inferInsert;

/**
 * AI usage logs for cost tracking (metadata only, not encrypted)
 */
export const aiUsageLogs = mysqlTable("ai_usage_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // References auth_users.id
  userEmail: varchar("userEmail", { length: 320 }).notNull(), // Denormalized for easier reporting
  workshopId: varchar("workshopId", { length: 50 }).notNull(),
  questionId: varchar("questionId", { length: 100 }).notNull(),
  promptTokens: int("promptTokens").notNull(), // Tokens in user's question
  completionTokens: int("completionTokens").notNull(), // Tokens in AI's response
  totalTokens: int("totalTokens").notNull(), // Total tokens used
  model: varchar("model", { length: 100 }).notNull(), // e.g., "gpt-4o-mini"
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type AiUsageLog = typeof aiUsageLogs.$inferSelect;
export type InsertAiUsageLog = typeof aiUsageLogs.$inferInsert;

/**
 * Shared homework submissions from users to team
 */
export const sharedHomework = mysqlTable("shared_homework", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // References auth_users.id
  userEmail: varchar("userEmail", { length: 320 }).notNull(),
  workshopId: varchar("workshopId", { length: 50 }).notNull(),
  workshopNumber: int("workshopNumber").notNull(),
  workshopTitle: varchar("workshopTitle", { length: 500 }).notNull(),
  workshopDate: varchar("workshopDate", { length: 100 }).notNull(),
  pdfData: longtext("pdfData").notNull(), // Base64 encoded PDF
  fileName: varchar("fileName", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["pending", "sent", "archived"]).default("pending").notNull(),
  sharedAt: timestamp("sharedAt").defaultNow().notNull(),
  sentAt: timestamp("sentAt"),
  notes: text("notes"), // Admin notes
});

export type SharedHomework = typeof sharedHomework.$inferSelect;
export type InsertSharedHomework = typeof sharedHomework.$inferInsert;

/**
 * Spiegelwerk test results — saved automatically when a user completes the test
 */
export const spiegelwerkResults = mysqlTable("spiegelwerk_results", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // References auth_users.id
  userEmail: varchar("userEmail", { length: 320 }).notNull(),
  // Combined scores (the final weighted result per structure, 0-100)
  scoreA: int("scoreA").notNull(),
  scoreB: int("scoreB").notNull(),
  scoreS: int("scoreS").notNull(),
  scoreC: int("scoreC").notNull(),
  scoreD: int("scoreD").notNull(),
  scoreE: int("scoreE").notNull(),
  // Sub-scores per method (stored as JSON strings)
  scoresNormI: text("scoresNormI").notNull(), // JSON: { A: number, B: number, ... }
  scoresNormII: text("scoresNormII").notNull(),
  scoresNormIII: text("scoresNormIII").notNull(),
  // Profile metadata
  profileType: varchar("profileType", { length: 20 }).notNull(), // "Piektype" | "Mengtype"
  topStructures: varchar("topStructures", { length: 20 }).notNull(), // e.g. "A,D,S" (top 3 sorted)
  portraitText: longtext("portraitText"), // AI-generated portrait text (saved after generation)
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

export type SpiegelwerkResult = typeof spiegelwerkResults.$inferSelect;
export type InsertSpiegelwerkResult = typeof spiegelwerkResults.$inferInsert;

