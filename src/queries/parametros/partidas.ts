import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { stringNull } from '@/types/StringNull'

const url = process.env.BACKEND_URL

export const budgetItemResponseSchema = z.object({
    id: z.string().uuid(),
    code: z.string(),
    name: z.string(),
    accumulate: z.boolean(),
    parent_id: z.string().nullable(),
    parent_code: stringNull,
    parent_name: stringNull,
})

export type BudgetItemResponse = z.infer<typeof budgetItemResponseSchema>

export const getAllBudgetItems = createServerFn({ method: 'GET' }).handler(
    async () => {
        const response = await fetch(`${url}/budget-items`)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        return data as BudgetItemResponse[]
    },
)
