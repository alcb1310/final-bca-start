import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const url = process.env.BACKEND_URL

export const categorySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
})

export const createCategorySchema = z.object({
    name: z.string().min(1, { message: 'El nombre es requerido' }),
})

export type CategoryType = z.infer<typeof categorySchema>
export type CreateCategoryType = z.infer<typeof createCategorySchema>

export const getAllCategories = createServerFn({ method: 'GET' }).handler(
    async () => {
        const response = await fetch(`${url}/categories`)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        return data as CategoryType[]
    },
)
