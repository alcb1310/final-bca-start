import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/parametros/rubros/crear')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/parametros/rubros/crear"!</div>
}
