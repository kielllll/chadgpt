import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { index } from 'drizzle-orm/sqlite-core'
import { text } from 'drizzle-orm/sqlite-core'
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable(
  'users',
  {
    id: text('id').primaryKey(),
    model: text('model'),
    createdAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updatedAt').default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    idxUsersModel: index('idx_users_model').on(table.model),
  })
)

export const conversations = sqliteTable(
  'conversations',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
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
    id: text('id').primaryKey(),
    conversationId: text('conversationId').notNull(),
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

export const userRelations = relations(users, ({ many }) => ({
  conversations: many(conversations),
}))

export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    user: one(users, {
      fields: [conversations.userId],
      references: [users.id],
    }),
    messages: many(messages),
  })
)

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}))
