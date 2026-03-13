import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { facturaResponseSchema } from './facturas'
import { projectResponseSchema } from '../parametros/projects'
import { supplierResponseSchema } from '../parametros/proveedores'
import { budgetItemResponseSchema } from '../parametros/partidas'

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

export type DetalleResponseType = z.infer<typeof detalleResponseSchema>

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
