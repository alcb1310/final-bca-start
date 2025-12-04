import { betterAuth } from 'better-auth'
import { drizzle } from 'drizzle-orm/node-postgres'

const db = drizzle(process.env.DATABASE_URL || '')
export const auth = betterAuth({
})
