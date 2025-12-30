import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const url = process.env.BACKEND_URL

export const rubroResponseSchema = z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    unit: z.string(),
})

export const createRubroSchema = z.object({
    code: z.string(),
    name: z.string(),
    unit: z.string(),
})

export type RubroResponseType = z.infer<typeof rubroResponseSchema>
export type RubroCreateType = z.infer<typeof createRubroSchema>

export const getAllRubros = createServerFn({ method: 'GET' }).handler(
    async () => {
        const response = await fetch(`${url}/items`)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        return data as RubroResponseType[]
    },
)
