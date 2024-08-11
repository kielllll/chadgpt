import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

config({ path: '.env.local' }) // or .env.local

const client = createClient({
  url: process.env.NEXT_APP_TURSO_CONNECTION_URL!,
  authToken: process.env.NEXT_APP_TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client, {
  schema,
})
