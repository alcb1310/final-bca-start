import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const url = process.env.BACKEND_URL

export const singleRubroResponseSchema = z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    unit: z.string(),
})

export const rubroMaterialResponseSchema = z.object({
    item_id: z.string(),
    item_code: z.string(),
    item_name: z.string(),
    item_unit: z.string(),
    material_id: z.string(),
    material_code: z.string(),
    material_name: z.string(),
    material_unit: z.string(),
    quantity: z.number(),
})

export const rubroResponseSchema = z.object({
    item: singleRubroResponseSchema,
    itemMaterials: z.array(rubroMaterialResponseSchema),
})

export const createRubroSchema = z.object({
    code: z.string(),
    name: z.string(),
    unit: z.string(),
})

export type SingleRubroResponseType = z.infer<typeof singleRubroResponseSchema>
export type RubroCreateType = z.infer<typeof createRubroSchema>
export type RubroMaterialType = z.infer<typeof rubroMaterialResponseSchema>
export type RubroResponseType = z.infer<typeof rubroResponseSchema>

export const getAllRubros = createServerFn({ method: 'GET' }).handler(
    async () => {
        const response = await fetch(`${url}/items`)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        return data as SingleRubroResponseType[]
    },
)

export const getRubro = createServerFn({ method: 'GET' })
    .inputValidator((data: { id: string }) => {
        return {
            id: data.id,
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/items/${data.id}`)
        const dataRes = await response.json()

        if (!response.ok) {
            throw new Error(dataRes.message)
        }

        return dataRes as RubroResponseType
    })

export const createRubro = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: RubroCreateType }) => {
        return {
            code: data.data.code,
            name: data.data.name,
            unit: data.data.unit,
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const resData = await response.json()

        if (!response.ok) {
            throw new Error(
                JSON.stringify({ code: response.status, data: resData }),
            )
        }
        return resData as RubroResponseType
    })

export const updateRubro = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: SingleRubroResponseType }) => {
        return {
            id: data.data.id,
            code: data.data.code,
            name: data.data.name,
            unit: data.data.unit,
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/items/${data.id}`, {
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
        return
    })
