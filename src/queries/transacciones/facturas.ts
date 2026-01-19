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

export const createFactura = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: FacturaCreateType }) => {
        return {
            project_id: data.data.project_id,
            supplier_id: data.data.supplier_id,
            invoice_number: data.data.invoice_number,
            invoice_date: data.data.invoice_date,
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/invoices`, {
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
