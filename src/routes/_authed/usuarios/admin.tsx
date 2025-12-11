import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { CreateUserDrawer } from '@/components/drawers/users/create-user'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import { authClient } from '@/utils/auth-client'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authed/usuarios/admin')({
    component: RouteComponent,
    loader: async ({ context: { queryClient } }) => {
        await queryClient.ensureQueryData({
            queryKey: ['users'],
            queryFn: () =>
                authClient.admin.listUsers({
                    query: { sortBy: 'email' },
                }),
        })
        await queryClient.ensureQueryData({
            queryKey: ['session'],
            queryFn: () => authClient.getSession(),
        })
    },
})

function RouteComponent() {
    const queryClient = useQueryClient()
    const { data: users } = useSuspenseQuery({
        queryKey: ['users'],
        queryFn: () =>
            authClient.admin.listUsers({
                query: { sortBy: 'email' },
            }),
    })
    const { data: session } = useSuspenseQuery({
        queryKey: ['session'],
        queryFn: () => authClient.getSession(),
    })

    const mutate = useMutation({
        mutationFn: (id: string) => authClient.admin.removeUser({ userId: id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success('Usuario eliminado')
        },
        onError: () => {
            toast.error('No se pudo eliminar el usuario', {
                description: 'Por favor, contactarse con el administrador',
                richColors: true,
                position: 'top-center',
            })
        },
    })

    const user = session.data?.user

    const columns: ColumnDef<typeof users>[] = [
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Nombre',
            accessorKey: 'name',
        },
        {
            header: 'Rol',
            accessorKey: 'role',
        },
        {
            header: '',
            accessorKey: 'actions',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-0'>
                        <Button
                            variant='ghost'
                            size='icon-sm'
                            className='text-warning'
                        >
                            <PencilIcon />
                        </Button>
                        {row.original.email !== user?.email && (
                            <Button
                                variant='ghost'
                                size='icon-sm'
                                className='text-destructive'
                                onClick={() => mutate.mutate(row.original.id)}
                            >
                                <TrashIcon />
                            </Button>
                        )}
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <PageTitle title='Administar usuarios' />

            <CreateUserDrawer />

            <DataTable columns={columns} data={users.data?.users} />
        </>
    )
}
