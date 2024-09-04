'use server'

import { db } from '@/lib/db'
import { conversations } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

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
    })

    return result
  } catch (error: any) {
    console.log(error)
    throw new Error('conversation.ts: getConversations: ' + error)
  }
}
