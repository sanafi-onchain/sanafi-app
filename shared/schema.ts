import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  walletAddress: text("wallet_address").unique(),
  createdAt: timestamp("created_at").defaultNow()
});

export const userSchema = createInsertSchema(users);
export const insertUserSchema = userSchema.omit({ id: true, createdAt: true });

// Transaction Schema
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // deposit, investment, spend, savings, profit
  title: text("title").notNull(),
  amount: doublePrecision("amount").notNull(),
  reward: doublePrecision("reward"),
  walletAddress: text("wallet_address").notNull(),
  date: timestamp("date").defaultNow(),
  status: text("status").notNull(), // Successful, Completed, Failed, Pending
  txHash: text("tx_hash") // blockchain transaction hash
});

export const transactionSchema = createInsertSchema(transactions);
export const insertTransactionSchema = transactionSchema.omit({ id: true });

// Investment Schema
export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  amount: doublePrecision("amount").notNull(),
  expectedReturn: text("expected_return").notNull(), // as percentage string "5.2"
  riskLevel: text("risk_level").notNull(), // Low, Low-Medium, Medium, Medium-High, High
  compliance: text("compliance").notNull(), // AAOIFI-Compliant, Sharia-Compliant, Mudarabah-Based
  walletAddress: text("wallet_address").notNull(),
  type: text("type").notNull(), // sukuk, equity, mudarabah
  sector: text("sector"), // real-estate, technology, health, consumer
  date: timestamp("date").defaultNow(),
  featured: boolean("featured").default(false)
});

export const investmentSchema = createInsertSchema(investments);
export const insertInvestmentSchema = investmentSchema.omit({ id: true });

// Savings Schema
export const savings = pgTable("savings", {
  walletAddress: text("wallet_address").primaryKey(),
  balance: doublePrecision("balance").notNull().default(0),
  annualizedReturn: doublePrecision("annualized_return").notNull().default(4),
  goalAmount: doublePrecision("goal_amount"),
  lastDistribution: timestamp("last_distribution")
});

export const savingsSchema = createInsertSchema(savings);

// Rewards Schema
export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  source: text("source").notNull(), // merchant name
  amount: doublePrecision("amount").notNull(),
  walletAddress: text("wallet_address").notNull(),
  date: timestamp("date").defaultNow()
});

export const rewardSchema = createInsertSchema(rewards);
export const insertRewardSchema = rewardSchema.omit({ id: true, date: true });

// Notification Schema
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // investment, savings, education, spend
  isNew: boolean("is_new").default(true),
  date: timestamp("date").defaultNow(),
  actionUrl: text("action_url")
});

export const notificationSchema = createInsertSchema(notifications);
export const insertNotificationSchema = notificationSchema.omit({ id: true, date: true });

// Type Exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;

export type Savings = typeof savings.$inferSelect;

export type Reward = typeof rewards.$inferSelect;
export type InsertReward = z.infer<typeof insertRewardSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
