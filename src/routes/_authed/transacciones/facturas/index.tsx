import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PlusIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import {
    type FacturaResponseType,
    getFacturas,
} from '@/queries/transacciones/facturas'

export const Route = createFileRoute('/_authed/transacciones/facturas/')({
    component: RouteComponent,
    loader: ({ context: { queryClient } }) => {
        return queryClient.ensureQueryData({
            queryKey: ['facturas'],
            queryFn: () => getFacturas(),
        })
    },
})

function RouteComponent() {
    const { data } = useSuspenseQuery({
        queryKey: ['facturas'],
        queryFn: () => getFacturas(),
    })
    const columns: ColumnDef<FacturaResponseType>[] = []

    console.log(data)

    return (
        <div>
            <PageTitle title='Facturas' />

            <Button>
                <PlusIcon size={10} />
                Crear Factura
            </Button>

            <DataTable data={data} columns={columns} />
        </div>
    )
}
