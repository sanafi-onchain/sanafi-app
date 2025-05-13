import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  walletAddress: text("wallet_address").unique(),
  email: text("email").unique(),
  phone: text("phone"),
  country: text("country"),
  preferences: text("preferences").default("{}"),
  kycStatus: text("kyc_status").default("pending"), // pending, verified, rejected
  createdAt: timestamp("created_at").defaultNow()
});

export const usersRelations = relations(users, ({ one, many }) => ({
  kyc: one(kycVerifications, {
    fields: [users.id],
    references: [kycVerifications.userId]
  }),
  wallet: one(wallets, {
    fields: [users.id],
    references: [wallets.userId]
  }),
  paymentCards: many(paymentCards),
  transactions: many(transactions, {
    relationName: "user_transactions"
  }),
  investments: many(investments, {
    relationName: "user_investments"
  }),
  rewards: many(rewards, {
    relationName: "user_rewards"
  })
}));

export const userSchema = createInsertSchema(users);
export const insertUserSchema = userSchema.omit({ id: true, createdAt: true, kycStatus: true });

// KYC Information
export const kycVerifications = pgTable("kyc_verifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  status: text("status").notNull(), // pending, verified, rejected
  verificationId: text("verification_id"), // Sumsub verification ID
  dateSubmitted: timestamp("date_submitted").defaultNow(),
  dateVerified: timestamp("date_verified"),
  documentType: text("document_type"), // passport, id_card, etc.
});

export const kycVerificationsRelations = relations(kycVerifications, ({ one }) => ({
  user: one(users, {
    fields: [kycVerifications.userId],
    references: [users.id]
  })
}));

export const kycVerificationSchema = createInsertSchema(kycVerifications);
export const insertKycVerificationSchema = kycVerificationSchema.omit({ id: true, dateSubmitted: true, dateVerified: true });

// Wallet Management (detailed wallet info)
export const wallets = pgTable("wallets", {
  id: serial("id").primaryKey(),
  address: text("address").notNull().unique(),
  userId: integer("user_id").references(() => users.id),
  balance: doublePrecision("balance").notNull().default(0),
  provider: text("provider"), // Privy, Phantom, Solflare
  type: text("type").default("solana"), // solana, ethereum, etc.
  isConnected: boolean("is_connected").default(true),
  dateCreated: timestamp("date_created").defaultNow(),
  lastActivity: timestamp("last_activity").defaultNow()
});

export const walletsRelations = relations(wallets, ({ one, many }) => ({
  user: one(users, {
    fields: [wallets.userId],
    references: [users.id]
  }),
  transactions: many(transactions, {
    relationName: "wallet_transactions"
  }),
  savings: one(savings, {
    fields: [wallets.address],
    references: [savings.walletAddress]
  })
}));

export const walletSchema = createInsertSchema(wallets);
export const insertWalletSchema = walletSchema.omit({ id: true, dateCreated: true, lastActivity: true, balance: true, isConnected: true });

// Card Management (for Stripe integration)
export const paymentCards = pgTable("payment_cards", {
  id: serial("id").primaryKey(), 
  userId: integer("user_id").notNull().references(() => users.id),
  lastFourDigits: text("last_four_digits").notNull(),
  expiryDate: text("expiry_date").notNull(),
  cardholderName: text("cardholder_name").notNull(),
  isActive: boolean("is_active").default(true),
  stripeCardId: text("stripe_card_id").notNull(),
  dateAdded: timestamp("date_added").defaultNow()
});

export const paymentCardsRelations = relations(paymentCards, ({ one }) => ({
  user: one(users, {
    fields: [paymentCards.userId],
    references: [users.id]
  })
}));

export const paymentCardSchema = createInsertSchema(paymentCards);
export const insertPaymentCardSchema = paymentCardSchema.omit({ id: true, dateAdded: true, isActive: true });

// Transaction Schema
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // deposit, investment, spend, savings, profit
  title: text("title").notNull(),
  amount: doublePrecision("amount").notNull(),
  reward: doublePrecision("reward"),
  walletAddress: text("wallet_address").notNull(),
  userId: integer("user_id").references(() => users.id),
  date: timestamp("date").defaultNow(),
  status: text("status").notNull(), // Successful, Completed, Failed, Pending
  txHash: text("tx_hash") // blockchain transaction hash
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
    relationName: "user_transactions"
  }),
  wallet: one(wallets, {
    fields: [transactions.walletAddress],
    references: [wallets.address],
    relationName: "wallet_transactions"
  })
}));

export const transactionSchema = createInsertSchema(transactions);
export const insertTransactionSchema = transactionSchema.omit({ id: true, date: true });

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
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(), // sukuk, equity, mudarabah
  sector: text("sector"), // real-estate, technology, health, consumer
  date: timestamp("date").defaultNow(),
  featured: boolean("featured").default(false)
});

export const investmentsRelations = relations(investments, ({ one }) => ({
  user: one(users, {
    fields: [investments.userId],
    references: [users.id],
    relationName: "user_investments"
  })
}));

export const investmentSchema = createInsertSchema(investments);
export const insertInvestmentSchema = investmentSchema.omit({ id: true, date: true, featured: true });

// Savings Schema
export const savings = pgTable("savings", {
  walletAddress: text("wallet_address").primaryKey(),
  balance: doublePrecision("balance").notNull().default(0),
  annualizedReturn: doublePrecision("annualized_return").notNull().default(4),
  goalAmount: doublePrecision("goal_amount"),
  lastDistribution: timestamp("last_distribution")
});

export const savingsRelations = relations(savings, ({ one }) => ({
  wallet: one(wallets, {
    fields: [savings.walletAddress],
    references: [wallets.address]
  })
}));

export const savingsSchema = createInsertSchema(savings);

// Rewards Schema
export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  source: text("source").notNull(), // merchant name
  amount: doublePrecision("amount").notNull(),
  walletAddress: text("wallet_address").notNull(),
  userId: integer("user_id").references(() => users.id),
  date: timestamp("date").defaultNow()
});

export const rewardsRelations = relations(rewards, ({ one }) => ({
  user: one(users, {
    fields: [rewards.userId],
    references: [users.id],
    relationName: "user_rewards"
  })
}));

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
  actionUrl: text("action_url"),
  userId: integer("user_id").references(() => users.id)
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id]
  })
}));

export const notificationSchema = createInsertSchema(notifications);
export const insertNotificationSchema = notificationSchema.omit({ id: true, date: true, isNew: true });

// Type Exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type KycVerification = typeof kycVerifications.$inferSelect;
export type InsertKycVerification = z.infer<typeof insertKycVerificationSchema>;

export type Wallet = typeof wallets.$inferSelect;
export type InsertWallet = z.infer<typeof insertWalletSchema>;

export type PaymentCard = typeof paymentCards.$inferSelect;
export type InsertPaymentCard = z.infer<typeof insertPaymentCardSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;

export type Savings = typeof savings.$inferSelect;

export type Reward = typeof rewards.$inferSelect;
export type InsertReward = z.infer<typeof insertRewardSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
