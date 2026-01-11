import z from 'zod'

export const numberNull = z.object({
    Float64: z.number().nullable(),
    Valid: z.boolean(),
})
