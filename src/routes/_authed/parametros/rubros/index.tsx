import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, PlusIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import {
    getAllRubros,
    type RubroResponseType,
} from '@/queries/parametros/rubros'

export const Route = createFileRoute('/_authed/parametros/rubros/')({
    component: RouteComponent,
    loader: async ({ context: { queryClient } }) => {
        queryClient.prefetchQuery({
            queryKey: ['rubros'],
            queryFn: getAllRubros,
        })
    },
})

function RouteComponent() {
    const { data } = useSuspenseQuery({
        queryKey: ['rubros'],
        queryFn: getAllRubros,
    })

    const columns: ColumnDef<RubroResponseType>[] = [
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
            cell: ({ row }) => (
                <div>
                    <PencilIcon size={10} className='text-warning' />
                </div>
            ),
        },
    ]
    return (
        <div>
            <PageTitle title='Rubros' />

            <Button>
                <PlusIcon size={10} />
                Crear Rubro
            </Button>

            <DataTable columns={columns} data={data} />
        </div>
    )
}
