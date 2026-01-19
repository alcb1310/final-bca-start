import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { projectResponseSchema } from '../parametros/projects'
import { supplierResponseSchema } from '../parametros/proveedores'

const url = process.env.BACKEND_URL

export const facturaResponseSchema = z.object({
    id: z.string().uuid({ version: 'v4' }),
    project: projectResponseSchema,
    supplier: supplierResponseSchema,
    invoice_number: z.string(),
    invoice_date: z.date(),
    invoice_total: z.number(),
})

export const facturaCreateSchema = z.object({
    project_id: z.string().uuid({ version: 'v4' }),
    supplier_id: z.string().uuid({ version: 'v4' }),
    invoice_number: z
        .string()
        .min(1, { message: 'El número de factura es requerido' }),
    invoice_date: z.coerce.date(),
})

export type FacturaResponseType = z.infer<typeof facturaResponseSchema>
export type FacturaCreateType = z.infer<typeof facturaCreateSchema>

export const getFacturas = createServerFn({ method: 'GET' }).handler(
    async () => {
        const response = await fetch(`${url}/invoices`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }
        return data as FacturaResponseType[]
    },
)
