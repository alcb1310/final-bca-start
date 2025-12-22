import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { stringNull } from '@/types/StringNull'

const url = process.env.BACKEND_URL

export const budgetItemResponseSchema = z.object({
    id: z.string().uuid(),
    code: z.string(),
    name: z.string(),
    accumulate: z.boolean(),
    parent_id: z.string().uuid().nullable(),
    parent_code: stringNull,
    parent_name: stringNull,
})

export const budgetItemCreateSchema = z.object({
    code: z.string(),
    name: z.string(),
    accumulate: z.boolean(),
    parent_id: z.string().uuid().optional(),
})

export type BudgetItemResponse = z.infer<typeof budgetItemResponseSchema>
export type BudgetItemCreateType = z.infer<typeof budgetItemCreateSchema>

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

export const getPartidasByAccumulate = createServerFn({ method: 'GET' })
    .inputValidator((data: { accum: boolean }) => data)
    .handler(async ({ data }) => {
        const params = new URLSearchParams()
        params.set('accum', String(data.accum))
        const fetchUrl = new URL(`${url}/budget-items`)
        fetchUrl.search = params.toString()

        const response = await fetch(fetchUrl)
        const resData = await response.json()

        if (!response.ok) {
            throw new Error(resData.message)
        }

        return resData as BudgetItemResponse[]
    })

export const createBudgetItem = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: BudgetItemCreateType }) => {
        return {
            code: data.data.code,
            name: data.data.name,
            accumulate: data.data.accumulate,
            parent_id: data.data.parent_id,
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/budget-items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const resData = await response.json()
            throw new Error(
                JSON.stringify({ code: response.status, data: resData }),
            )
        }
        return
    })
