import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { index } from 'drizzle-orm/sqlite-core'
import { text } from 'drizzle-orm/sqlite-core'
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const conversations = sqliteTable(
  'conversations',
  {
    id: integer('id').primaryKey(),
    userId: integer('userId').notNull(),
    title: text('title').notNull(),
    createdAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updatedAt').default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    idxConversationsUserId: index('idx_conversations_userId').on(table.userId),
  })
)

export const messages = sqliteTable(
  'messages',
  {
    id: integer('id').primaryKey(),
    conversationId: integer('conversationId').notNull(),
    role: text('role').notNull(),
    content: text('content').notNull(),
    metadata: text('metadata'),
    createdAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updatedAt').default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    idxMessagesConversationId: index('idx_messages_conversationId').on(
      table.conversationId
    ),
    idxMessagesRole: index('idx_messages_role').on(table.role),
  })
)

export const conversationsRelations = relations(conversations, ({ many }) => ({
  messages: many(messages),
}))

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}))
