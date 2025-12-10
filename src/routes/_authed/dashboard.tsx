import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard')({
    component: RouteComponent,
    loader: async ({ serverContext }) => {
        return {
            user: serverContext?.user,
        }
    },
})

function RouteComponent() {
    const { user } = Route.useLoaderData()

    return (
        <div>
            Bienvenido&nbsp;
            <span className='py-1 px-2 bg-accent text-accent-foreground'>
                {user?.name}
            </span>
        </div>
    )
}
