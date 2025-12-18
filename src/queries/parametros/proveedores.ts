import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { stringNull } from '@/types/StringNull'

const url = process.env.BACKEND_URL

export const projectResponseSchema = z.object({
    id: z.string().uuid({ version: 'v4' }),
    name: z.string(),
    supplier_id: z.string(),
    contact_name: stringNull,
    contact_email: stringNull,
    contact_phone: stringNull,
})
export type ProjectResponseType = z.infer<typeof projectResponseSchema>

export const getAllSuppliers = createServerFn({ method: 'GET' }).handler(
    async () => {
        const response = await fetch(`${url}/suppliers`)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        return data as ProjectResponseType[]
    },
)
