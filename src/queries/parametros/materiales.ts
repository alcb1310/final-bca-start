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

export const createMaterial = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: MaterialCreateType }) => {
        return {
            name: data.data.name,
            code: data.data.code,
            unit: data.data.unit,
            category_id: data.data.category_id,
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/materials`, {
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

export const updateMaterial = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: MaterialResponseType }) => {
        return {
            id: data.data.id,
            name: data.data.name,
            code: data.data.code,
            unit: data.data.unit,
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/materials/${data.id}`, {
            method: 'PUT',
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
    })

export const deleteMaterial = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: MaterialResponseType }) => {
        return {
            id: data.data.id,
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/materials/${data.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            const resData = await response.json()
            throw new Error(
                JSON.stringify({ code: response.status, data: resData }),
            )
        }
        return
    })
