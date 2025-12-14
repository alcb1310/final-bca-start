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
