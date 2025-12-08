import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { createAuthClient } from 'better-auth/client'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '@/db/schema'

const db = drizzle(process.env.DATABASE_URL || '')

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
    }),
    baseURL: process.env.BETTER_AUTH_URL || '',
    emailAndPassword: {
        enabled: true,
    },
    plugins: [tanstackStartCookies()],
})

export const authClient = createAuthClient()
