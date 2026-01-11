import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PlusIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import { getAllBudgets } from '@/queries/transacciones/presupuesto'

export const Route = createFileRoute('/_authed/transacciones/presupuesto')({
    component: RouteComponent,
    loader: ({ context: { queryClient } }) => {
        queryClient.ensureQueryData({
            queryKey: ['presupuesto'],
            queryFn: getAllBudgets,
        })
    },
})

function RouteComponent() {
    const columns: ColumnDef<any>[] = []

    const { data } = useSuspenseQuery({
        queryKey: ['presupuesto'],
        queryFn: getAllBudgets,
    })

    return (
        <div>
            <PageTitle title='Presupuesto' />

            <Button variant='default' className='mb-3'>
                <PlusIcon size={10} />
                Crear Presupuesto
            </Button>

            <DataTable data={data} columns={columns} />
        </div>
    )
}
