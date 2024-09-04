'use server'

import { db } from '@/lib/db'
import { conversations, messages } from '@/lib/db/schema'
import { desc, eq, inArray } from 'drizzle-orm'

export async function addConversation({
  userId,
  title,
}: {
  userId: string
  title: string
}) {
  try {
    const newConversation = {
      id: crypto.randomUUID(),
      userId,
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await db.insert(conversations).values(newConversation)

    return newConversation
  } catch (error: any) {
    console.log(error)
    throw new Error('conversation.ts: addConversation: ' + error)
  }
}

export async function getConversationsByUserId(userId: string) {
  try {
    const result = await db.query.conversations.findMany({
      where: eq(conversations.userId, userId),
      orderBy: desc(conversations.createdAt),
    })

    return result
  } catch (error: any) {
    console.log(error)
    throw new Error('conversation.ts: getConversationsByUserId: ' + error)
  }
}

export async function removeConversationsByUserId(userId: string) {
  try {
    // get all conversations first
    const convos = await db.query.conversations.findMany({
      where: eq(conversations.userId, userId),
      columns: {
        id: true,
      },
    })

    if (convos.length === 0) {
      throw new Error('No conversations found')
    }

    const convoIds = convos.map((convo) => convo.id)

    // delete all messages first
    await db.delete(messages).where(inArray(messages.conversationId, convoIds))

    // delete all conversations
    await db.delete(conversations).where(eq(conversations.userId, userId))

    return {
      success: true,
      message: 'Conversations removed',
    }
  } catch (error: any) {
    console.log(error)
    throw new Error('conversation.ts: removeConversationsByUserId: ' + error)
  }
}
