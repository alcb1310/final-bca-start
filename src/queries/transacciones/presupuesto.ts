import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { budgetItemResponseSchema } from '../parametros/partidas'
import { projectResponseSchema } from '../parametros/projects'

const url = process.env.BACKEND_URL

export const budgetResponseSchema = z.object({
    project: projectResponseSchema,
    budget_item: budgetItemResponseSchema,
    initial_quantity: z.number().nullable(),
    initial_cost: z.number().nullable(),
    initial_total: z.number(),
    spent_quantity: z.number().nullable(),
    spent_total: z.number(),
    remaining_quantity: z.number().nullable(),
    remaining_cost: z.number().nullable(),
    remaining_total: z.number(),
    updated_budget: z.number(),
})

export type BudgetResponseType = z.infer<typeof budgetResponseSchema>

export const getAllBudgets = createServerFn({ method: 'GET' }).handler(
    async () => {
        const response = await fetch(`${url}/budgets`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }
        return data
    },
)

