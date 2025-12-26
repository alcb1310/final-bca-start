import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon } from 'lucide-react'
import CreateCategoryDrawer from '@/components/drawers/parametros/categorias/create-category'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import {
    type CategoryType,
    getAllCategories,
} from '@/queries/parametros/categories'

export const Route = createFileRoute('/_authed/parametros/categorias')({
    component: RouteComponent,
    loader: ({ context: { queryClient } }) => {
        queryClient.ensureQueryData({
            queryKey: ['categorias'],
            queryFn: getAllCategories,
        })
    },
})

function RouteComponent() {
    const { data } = useSuspenseQuery({
        queryKey: ['categorias'],
        queryFn: getAllCategories,
    })

    const columns: ColumnDef<CategoryType>[] = [
        {
            header: 'Nombre',
            accessorKey: 'name',
        },
        {
            header: '',
            accessorKey: 'actions',
            cell: ({ row }) => {
                return <PencilIcon size={10} />
            },
        },
    ]

    return (
        <div>
            <PageTitle title='Categorias' />

            <CreateCategoryDrawer />

            <DataTable columns={columns} data={data} />
        </div>
    )
}
