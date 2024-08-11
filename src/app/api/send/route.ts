import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { apiKey, messages } = body

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
      stream: true,
    })

    const stream = new ReadableStream({
      async start(controller) {
        for await (const part of res) {
          const text = part.choices[0]?.delta?.content || ''
          controller.enqueue(text)
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('send.ts: handler: ', error)
    throw new Error(error)
  }
}
