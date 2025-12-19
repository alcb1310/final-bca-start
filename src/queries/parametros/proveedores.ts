import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { stringNull } from '@/types/StringNull'

const url = process.env.BACKEND_URL

export const supplierResponseSchema = z.object({
    id: z.string().uuid({ version: 'v4' }),
    name: z.string(),
    supplier_id: z.string(),
    contact_name: stringNull,
    contact_email: stringNull,
    contact_phone: stringNull,
})
export const supplierCreateSchema = z.object({
    name: z.string().min(1, { message: 'El nombre es requerido' }),
    supplier_id: z.string().min(1, { message: 'El RUC es requerido' }),
    contact_name: z.string().optional(),
    contact_email: z.string().optional(),
    contact_phone: z.string().optional(),
})

export type SupplierResponseType = z.infer<typeof supplierResponseSchema>
export type SupplierCreateType = z.infer<typeof supplierCreateSchema>

export const getAllSuppliers = createServerFn({ method: 'GET' }).handler(
    async () => {
        const response = await fetch(`${url}/suppliers`)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        return data as SupplierResponseType[]
    },
)

export const createSupplier = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: SupplierCreateType }) => {
        return {
            name: data.data.name,
            supplier_id: data.data.supplier_id,
            contact_name: data.data.contact_name,
            contact_email: data.data.contact_email,
            contact_phone: data.data.contact_phone,
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/suppliers`, {
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
