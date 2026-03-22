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

export const createDetalles = createServerFn({ method: 'POST' })
    .inputValidator((data: { data: DetalleCreateType }) => {
        return {
            invoice_id: data.data.invoice_id,
            budget_item_id: data.data.budget_item_id,
            quantity: Number.parseFloat(String(data.data.quantity)),
            cost: Number.parseFloat(String(data.data.cost)),
        }
    })
    .handler(async ({ data }) => {
        const response = await fetch(
            `${url}/invoices/${data.invoice_id}/details`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        )

        if (!response.ok) {
            const resData = await response.json()
            throw new Error(resData)
        }
        return
    })
