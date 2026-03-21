import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { budgetItemResponseSchema } from '../parametros/partidas'
import { projectResponseSchema } from '../parametros/projects'
import { supplierResponseSchema } from '../parametros/proveedores'
import { facturaResponseSchema } from './facturas'

const url = process.env.BACKEND_URL

export const detalleResponseSchema = z.object({
    invoice: facturaResponseSchema,
    project: projectResponseSchema,
    supplier: supplierResponseSchema,
    budget_item: budgetItemResponseSchema,
    quantity: z.number(),
    cost: z.number(),
    total: z.number(),
})

export const detalleCreateSchema = z.object({
    invoice_id: z.string().uuid({ version: 'v4' }),
    budget_item_id: z.string().uuid({ version: 'v4' }),
    quantity: z.coerce.number({ message: 'Ingrese un número valido' }),
    cost: z.coerce.number({ message: 'Ingrese un número valido' }),
})

export type DetalleResponseType = z.infer<typeof detalleResponseSchema>
export type DetalleCreateType = z.infer<typeof detalleCreateSchema>

export const getDetalles = createServerFn({ method: 'GET' })
    .inputValidator((data: { id: string }) => {
        return { id: data.id }
    })
    .handler(async ({ data }) => {
        const response = await fetch(`${url}/invoices/${data.id}/details`)
        const dataRes = await response.json()
        if (!response.ok) {
            throw new Error(dataRes.message)
        }
        return dataRes as DetalleResponseType[]
    })
