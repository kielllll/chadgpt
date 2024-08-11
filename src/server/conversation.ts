'use server'

import OpenAI from 'openai'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function send(
  apiKey: string,
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
) {
  try {
    // check first if apiKey exists
    const user = await db.query.users.findFirst({
      where: eq(users.id, apiKey),
    })

    if (!user?.id) throw new Error('API key not found')

    const openai = new OpenAI({
      apiKey,
    })

    const res = await openai.chat.completions.create({
      messages,
      model: user.model || 'gpt-4o-mini',
    })

    return {
      id: res.id,
      ...res.choices?.[0].message,
    }
  } catch (error: any) {
    console.log(error)
    throw new Error('conversation.ts: send: ' + error)
  }
}
