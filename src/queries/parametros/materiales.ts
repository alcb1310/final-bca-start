import z from 'zod'
import { categorySchema } from './categories'

export const materialResponseSchema = z.object({
    id: z.string().uuid({ version: 'v4' }),
    name: z.string(),
    code: z.string(),
    unit: z.string(),
    category: categorySchema,
})

export type MaterialResponseType = z.infer<typeof materialResponseSchema>
