'use server'

import { db } from '@/lib/db'
import { messages as messagesSchema } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

type Message = {
  id: string
  conversationId: string
  role: string
  content: string
  createdAt: string
  updatedAt: string
}

export async function addMessages(messages: Message[]) {
  try {
    await db.insert(messagesSchema).values(messages)

    return messages
  } catch (error: any) {
    console.log(error)
    throw new Error('conversation.ts: addConversation: ' + error)
  }
}

export async function getMessagesByConversationId(conversationId: string) {
  try {
    const result = await db.query.messages.findMany({
      where: eq(messagesSchema.conversationId, conversationId),
    })

    return result
  } catch (error: any) {
    console.log(error)
    throw new Error('conversation.ts: getConversations: ' + error)
  }
}
