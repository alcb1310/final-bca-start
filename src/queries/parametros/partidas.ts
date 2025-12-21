import z from 'zod'
import { stringNull } from '@/types/StringNull'

export const budgetItemResponseSchema = z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
    accumulate: z.boolean(),
    parent_id: z.string().nullable(),
    parent_code: stringNull,
    parent_name: stringNull,
})

export type BudgetItemResponse = z.infer<typeof budgetItemResponseSchema>
