import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import { getFactura } from '@/queries/transacciones/facturas'

export const Route = createFileRoute('/_authed/transacciones/facturas/$id')({
    component: RouteComponent,
    params: {
        parse: (rawParams) => {
            try {
                const id = z.uuid().parse(rawParams.id)
                return { id }
            } catch (error) {
                throw new Error(`Invalid id: ${error}`)
            }
        },
    },
    loader: async ({ context: { queryClient }, params: { id } }) => {
        queryClient.prefetchQuery({
            queryKey: ['factura', id],
            queryFn: () => getFactura({ data: { id } }),
        })
    },
})

function RouteComponent() {
    const { id } = Route.useParams()
    const { data: factura } = useSuspenseQuery({
        queryKey: ['factura', id],
        queryFn: () => getFactura({ data: { id } }),
    })

    return <div>Hello {factura.invoice_number}!</div>
}
