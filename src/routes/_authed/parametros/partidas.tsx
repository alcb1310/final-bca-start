import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PlusIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import type { BudgetItemResponse } from '@/queries/parametros/partidas'
import { Switch } from '@/components/ui/switch'

export const Route = createFileRoute('/_authed/parametros/partidas')({
    component: RouteComponent,
})

function RouteComponent() {
    const column: ColumnDef<BudgetItemResponse>[] = [
        {
            header: 'Código',
            accessorKey: 'code',
        },
        {
            header: 'Nombre',
            accessorKey: 'name',
        },
        {
            header: 'Nivel',
            accessorKey: 'level',
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
        },
        {
            header: 'Padre',
            accessorKey: 'parent_code',
        },
    ]

    return (
        <div>
            <PageTitle title='Partidas' />

            <Button variant='default' size='sm'>
                <PlusIcon size={10} />
                Crear Partida
            </Button>

            <DataTable columns={column} data={[]} />
        </div>
    )
}
