import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle } from 'drizzle-orm/node-postgres'

const db = drizzle(process.env.DATABASE_URL || '')

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
    baseURL: process.env.BETTER_AUTH_URL || '',
})
