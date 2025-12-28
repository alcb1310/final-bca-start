import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { categorySchema } from './categories'

const url = process.env.BACKEND_URL

export const materialResponseSchema = z.object({
    id: z.string().uuid({ version: 'v4' }),
    name: z.string(),
    code: z.string(),
    unit: z.string(),
    category: categorySchema,
})
export const materialCreateSchema = z.object({
    id: z.string().uuid({ version: 'v4' }),
    name: z.string().min(1, { message: 'El nombre es requerido' }),
    code: z.string().min(1, { message: 'El código es requerido' }),
    unit: z.string().min(1, { message: 'La unidad es requerida' }),
    category_id: z.string().uuid({ version: 'v4' }),
})

export type MaterialResponseType = z.infer<typeof materialResponseSchema>
export type MaterialCreateType = z.infer<typeof materialCreateSchema>

export const getAllMaterials = createServerFn({ method: 'GET' }).handler(
    async () => {
        const response = await fetch(`${url}/materials`)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        return data as MaterialResponseType[]
    },
)
