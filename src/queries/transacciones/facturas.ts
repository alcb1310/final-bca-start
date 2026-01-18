import { z } from 'zod'
import { projectResponseSchema } from '../parametros/projects'
import { supplierResponseSchema } from '../parametros/proveedores'

export const facturaResponseSchema = z.object({
    id: z.string().uuid({ version: 'v4' }),
    project: projectResponseSchema,
    supplier: supplierResponseSchema,
    invoice_number: z.string(),
    invoice_date: z.date(),
})

export type FacturaType = z.infer<typeof facturaResponseSchema>
