import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/_authed/parametros/rubros/$rubroId')({
    component: RouteComponent,
    params: {
        parse: (rawParams) => {
            try {
                const id = z.uuid().parse(rawParams.rubroId)
                return { rubroId: id }
            } catch (error) {
                throw new Error(`Invalid rubroId: ${error}`)
            }
        },
    },
})

function RouteComponent() {
    const { rubroId } = Route.useParams()

    return <div>Hello "/_authed/parametros/rubros/${rubroId}!</div>
}
