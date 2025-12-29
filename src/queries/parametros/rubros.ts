import { z } from 'zod'

export const rubroResponseSchema = z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    unit: z.string(),
})

export type RubroResponseType = z.infer<typeof rubroResponseSchema>
