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

    const result = await db.insert(users).values({
      id: apiKey,
    })

    if (!result.rowsAffected) throw new Error('Failed to add API key')

    return apiKey
  } catch (error: any) {
    console.log(error)
    throw new Error('apikey.ts: addApiKey: ' + error)
  }
}

export async function setModel(apiKey: string, model: string = 'gpt-4o-mini') {
  return await db
    .update(users)
    .set({ model })
    .where(eq(users.id, apiKey))
    .execute()
}
