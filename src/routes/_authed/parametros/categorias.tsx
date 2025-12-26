import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/parametros/categorias')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/parametros/categorias"!</div>
}
