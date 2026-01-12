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

export const createBudgetSchema = z.object({
    project_id: z.string().uuid({ version: 'v4' }),
    budget_item_id: z.string().uuid({ version: 'v4' }),
    quantity: z.number(),
    cost: z.number(),
})

export type BudgetResponseType = z.infer<typeof budgetResponseSchema>
export type BudgetCreateType = z.infer<typeof createBudgetSchema>

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

export const createBudget = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: BudgetCreateType }) => {
        return {
            project_id: data.data.project_id,
            budget_item_id: data.data.budget_item_id,
            quantity: Number.parseFloat(String(data.data.quantity)),
            cost: Number.parseFloat(String(data.data.cost)),
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/budgets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const resData = await response.json()
            throw new Error(resData)
        }
        return
    })
