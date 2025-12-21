import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon } from 'lucide-react'
import CreateItemDrawer from '@/components/drawers/parametros/partidas/create-item'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Switch } from '@/components/ui/switch'
import {
    type BudgetItemResponse,
    getAllBudgetItems,
} from '@/queries/parametros/partidas'

export const Route = createFileRoute('/_authed/parametros/partidas')({
    component: RouteComponent,
    loader: ({ context: { queryClient } }) => {
        queryClient.ensureQueryData({
            queryKey: ['partidas'],
            queryFn: getAllBudgetItems,
        })
    },
})

function RouteComponent() {
    const { data } = useSuspenseQuery({
        queryKey: ['partidas'],
        queryFn: getAllBudgetItems,
    })

    const column: ColumnDef<BudgetItemResponse>[] = [
        {
            header: 'Código',
            accessorKey: 'code',
            size: 50,
        },
        {
            header: 'Nombre',
            accessorKey: 'name',
            size: 600,
        },
        {
            header: 'Nivel',
            accessorKey: 'level',
            size: 25,
        },
        {
            header: 'Acumula',
            cell: ({ row }) => (
                <Switch
                    className='block mx-auto'
                    checked={row.original.accumulate}
                    disabled
                />
            ),
            size: 25,
        },
        {
            header: 'Padre',
            accessorKey: 'parent_code',
            size: 100,
        },

        {
            header: '',
            accessorKey: 'actions',
            cell: ({ row }) => {
                return <PencilIcon size={10} className='text-warning' />
            },
        },
    ]

    return (
        <div>
            <PageTitle title='Partidas' />

            <CreateItemDrawer />

            <DataTable columns={column} data={data} />
        </div>
    )
}
