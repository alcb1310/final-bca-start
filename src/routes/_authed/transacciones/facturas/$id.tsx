import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

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
})

function RouteComponent() {
    return <div>Hello "/_authed/transacciones/facturas/$id"!</div>
}
