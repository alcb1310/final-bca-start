import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/transacciones/facturas/crear')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/transacciones/facturas/crear"!</div>
}
