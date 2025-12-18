import z from 'zod'

export const stringNull = z.object({
    String: z.string().nullable(),
    Valid: z.boolean(),
})
