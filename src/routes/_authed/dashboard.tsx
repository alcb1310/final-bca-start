import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/utils/auth-client'

export const Route = createFileRoute('/_authed/dashboard')({
    component: RouteComponent,
    loader: async ({ context: { queryClient } }) => {
        await queryClient.ensureQueryData({
            queryKey: ['user'],
            queryFn: () => authClient.getSession(),
        })
    },
})

function RouteComponent() {
    const { data: session } = useSuspenseQuery({
        queryKey: ['user'],
        queryFn: () => authClient.getSession(),
    })

    return (
        <div>
            Bienvenido&nbsp;
            <span className='py-1 px-2 bg-accent text-accent-foreground'>
                {session.data?.user.name}
            </span>
        </div>
    )
}
