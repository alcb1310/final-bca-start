import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/utils/auth-client'

export const Route = createFileRoute('/_authed/dashboard')({
    component: RouteComponent,
    loader: async () => {
        const { data: session } = await authClient.getSession()

        return {
            user: session?.user,
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
