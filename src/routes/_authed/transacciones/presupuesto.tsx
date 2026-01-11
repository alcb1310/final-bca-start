import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/transacciones/presupuesto')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/transacciones/presupuesto"!</div>
}
