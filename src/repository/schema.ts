import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const chat = pgTable("chat", {
    chatId: varchar("chat_id").primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const messages = pgTable("messages", {
    messageId: varchar("message_id").primaryKey(),
    chatId: varchar("chat_id").notNull(),
    prompt: varchar("prompt").notNull(),
    response: varchar("response").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
}, (messages) => {
    return {
        chatIdIdx: index("chatId_messages_idx").on(messages.chatId),
    }
})