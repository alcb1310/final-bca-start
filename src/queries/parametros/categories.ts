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

export const createCategory = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: CreateCategoryType }) => {
        return {
            name: data.data.name,
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/categories`, {
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
