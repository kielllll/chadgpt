'use server'

import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function addApiKey(apiKey: string) {
  try {
    // check first if it exists
    const user = await db.query.users.findFirst({
      where: eq(users.id, apiKey),
    })

    if (user) throw new Error('API key already exists')

    await db.insert(users).values({
      id: apiKey,
    })

    return apiKey
  } catch (error: any) {
    console.log(error)
    throw new Error('apikey.ts: addApiKey: ' + error)
  }
}

export async function setModel(apiKey: string, model: string = 'gpt-4o-mini') {
  try {
    // check first if it does not exists
    const user = await db.query.users.findFirst({
      where: eq(users.id, apiKey),
    })

    if (!user) throw new Error('API key already exists')

    await db.update(users).set({ model }).where(eq(users.id, apiKey))

    return model
  } catch (error: any) {
    console.log(error)
    throw new Error('apikey.ts: setModel: ' + error)
  }
}
