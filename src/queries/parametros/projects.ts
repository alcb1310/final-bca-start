import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const url = process.env.BACKEND_URL
export const projectResponseSchema = z.object({
    id: z.string().uuid({ version: 'v4' }),
    name: z.string(),
    is_active: z.boolean(),
    gross_area: z.number(),
    net_area: z.number(),
})

export const projectCreateSchema = z.object({
    name: z
        .string({ message: 'El nombre es requerido' })
        .min(0, { message: 'El nombre es requerido' }),
    is_active: z.boolean(),
    gross_area: z.coerce.number({ message: 'Ingrese un número válido' }),
    net_area: z.coerce.number({ message: 'Ingrese un número válido' }),
})

export type ProjectCreateType = z.infer<typeof projectCreateSchema>
export type ProjectResponseType = z.infer<typeof projectResponseSchema>

export const getAllProjects = createServerFn({ method: 'GET' }).handler(
    async () => {
        const response = await fetch(`${url}/projects`)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        return data as ProjectResponseType[]
    },
)

export const createProject = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: ProjectCreateType }) => {
        return {
            name: data.data.name,
            is_active: data.data.is_active,
            gross_area: Number.parseFloat(String(data.data.gross_area)),
            net_area: Number.parseFloat(String(data.data.net_area)),
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/projects`, {
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
        return
    })

export const updateProject = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: ProjectResponseType }) => {
        return {
            id: data.data.id,
            name: data.data.name,
            is_active: data.data.is_active,
            gross_area: Number.parseFloat(String(data.data.gross_area)),
            net_area: Number.parseFloat(String(data.data.net_area)),
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/projects/${data.id}`, {
            method: 'PUT',
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
        return
    })
