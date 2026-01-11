import z from 'zod'
import { budgetItemResponseSchema } from '../parametros/partidas'
import { projectResponseSchema } from '../parametros/projects'

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
