import { createFileRoute } from '@tanstack/react-router'
import { PageTitle } from '@/components/pages/Title'
import { authClient } from '@/utils/auth-client'

export const Route = createFileRoute('/_authed/usuarios/perfil')({
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
        <>
            <PageTitle title='Perfil' />
            <div>
                <p>
                    <span className='text-green-600'>Nombre: </span>
                    {user?.name}
                </p>
                <p>
                    <span className='text-green-600'>Email: </span>
                    {user?.email}
                </p>
                <br />
                <p className='text-xs'>
                    <span className='font-bold'>Nota:</span> Para modificar el
                    perfil, favor contactarse con el administrador.
                </p>
            </div>
        </>
    )
}
