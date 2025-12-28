import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { TrashIcon } from 'lucide-react'
import { CreateMaterial } from '@/components/drawers/parametros/materiales/create-material'
import { EditMaterial } from '@/components/drawers/parametros/materiales/edit-materials'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import {
    getAllMaterials,
    type MaterialResponseType,
} from '@/queries/parametros/materiales'

export const Route = createFileRoute('/_authed/parametros/materiales')({
    component: RouteComponent,
    loader: ({ context: { queryClient } }) => {
        queryClient.ensureQueryData({
            queryKey: ['materiales'],
            queryFn: getAllMaterials,
        })
    },
})

function RouteComponent() {
    const { data } = useSuspenseQuery({
        queryKey: ['materiales'],
        queryFn: getAllMaterials,
    })

    const columns: ColumnDef<MaterialResponseType>[] = [
        {
            header: 'Categoría',
            accessorKey: 'category.name',
        },
        {
            header: 'Código',
            accessorKey: 'code',
        },
        {
            header: 'Nombre',
            accessorKey: 'name',
        },
        {
            header: 'Unidad',
            accessorKey: 'unit',
        },
        {
            header: '',
            accessorKey: 'actions',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-2 items-center'>
                        <EditMaterial material={row.original} />
                        <TrashIcon size={10} className='text-destructive' />
                    </div>
                )
            },
        },
    ]

    return (
        <div>
            <PageTitle title='Materiales' />

            <CreateMaterial />

            <DataTable columns={columns} data={data} />
        </div>
    )
}
