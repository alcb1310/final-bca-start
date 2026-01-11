import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { numberNull } from '@/types/NumberNull'
import { budgetItemResponseSchema } from '../parametros/partidas'
import { projectResponseSchema } from '../parametros/projects'

const url = process.env.BACKEND_URL

export const budgetResponseSchema = z.object({
    project: projectResponseSchema,
    budget_item: budgetItemResponseSchema,
    initial_quantity: numberNull,
    initial_cost: numberNull,
    initial_total: z.number(),
    spent_quantity: numberNull,
    spent_total: z.number(),
    remaining_quantity: numberNull,
    remaining_cost: numberNull,
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
