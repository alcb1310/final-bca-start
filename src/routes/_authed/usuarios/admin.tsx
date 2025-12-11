import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { CreateUserDrawer } from '@/components/drawers/users/create-user'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import { authClient } from '@/utils/auth-client'

export const Route = createFileRoute('/_authed/usuarios/admin')({
    component: RouteComponent,
    loader: async () => {
        const { data: users } = await authClient.admin.listUsers({
            query: {
                sortBy: 'email',
            },
        })

        return {
            users: users ? users.users : [],
        }
    },
})

function RouteComponent() {
    const { users } = Route.useLoaderData()

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
            // cell: ({ row }) => {
            cell: () => {
                return (
                    <div className='flex gap-0'>
                        <Button
                            variant='ghost'
                            size='icon-sm'
                            className='text-warning'
                        >
                            <PencilIcon />
                        </Button>
                        <Button
                            variant='ghost'
                            size='icon-sm'
                            className='text-destructive'
                        >
                            <TrashIcon />
                        </Button>
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <PageTitle title='Administar usuarios' />

            <CreateUserDrawer />

            <DataTable columns={columns} data={users} />
        </>
    )
}
