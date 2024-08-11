import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed hahhaha' })
    return
  }

  try {
    const { apiKey, messages } = req.body

    // check first if apiKey exists
    const user = await db.query.users.findFirst({
      where: eq(users.id, apiKey),
    })

    if (!user?.id) throw new Error('API key not found')

    const openai = new OpenAI({
      apiKey,
    })

    // const openaiResponse = await openai.createChatCompletion({
    //   model: 'gpt-4',
    //   messages: req.body.messages,
    //   stream: true,
    // }, { responseType: 'stream' });

    const res = await openai.chat.completions.create({
      messages,
      model: user.model || 'gpt-4o-mini',
      stream: true,
    })

    console.log(res)
    return res
  } catch (error: any) {
    console.error('send.ts: handler: ', error)
    res.status(500).json({ error })
  }
}
