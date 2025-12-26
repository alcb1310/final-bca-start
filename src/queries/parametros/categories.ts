import { z } from 'zod'

export const categorySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
})

export type CategoryType = z.infer<typeof categorySchema>
