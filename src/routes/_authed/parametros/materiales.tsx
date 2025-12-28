import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import {
    getAllMaterials,
    type MaterialResponseType,
} from '@/queries/parametros/materiales'
import { useSuspenseQuery } from '@tanstack/react-query'

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
                    <div className='flex gap-2'>
                        <PencilIcon size={10} className='text-warning' />
                        <TrashIcon size={10} className='text-destructive' />
                    </div>
                )
            },
        },
    ]

    return (
        <div>
            <PageTitle title='Materiales' />

            <Button variant={'default'} size={'sm'}>
                <PlusIcon size={10} />
                Crear Material
            </Button>

            <DataTable columns={columns} data={data} />
        </div>
    )
}
