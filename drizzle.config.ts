import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env.local' })

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.NEXT_APP_TURSO_CONNECTION_URL!,
    authToken: process.env.NEXT_APP_TURSO_AUTH_TOKEN!,
  },
  verbose: true,
  strict: true,
})
