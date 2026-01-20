import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, PlusIcon } from 'lucide-react'
import { DeleteInvoiceDialog } from '@/components/dialogs/transacciones/invoices'
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
    const navigate = useNavigate()
    const { data } = useSuspenseQuery({
        queryKey: ['facturas'],
        queryFn: () => getFacturas(),
    })
    const columns: ColumnDef<FacturaResponseType>[] = [
        {
            header: 'Fecha',
            cell: ({ row }) => {
                const dt = new Date(row.original.invoice_date)
                return (
                    <span>
                        {dt.getFullYear()}-
                        {String(dt.getMonth() + 1).padStart(2, '0')}-
                        {String(dt.getDate()).padStart(2, '0')}
                    </span>
                )
            },
        },
        {
            header: 'Proyecto',
            accessorKey: 'project.name',
        },
        {
            header: 'Proveedor',
            accessorKey: 'supplier.name',
        },
        {
            header: 'Número',
            accessorKey: 'invoice_number',
        },
        {
            header: 'Total',
            cell: ({ row }) => {
                return (
                    <span className='block text-right'>
                        {row.original.invoice_total.toLocaleString('es-EC', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                )
            },
        },
        {
            header: '',
            accessorKey: 'actions',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-2'>
                        <PencilIcon size={10} className='text-warning' />
                        {row.original.invoice_total === 0 && (
                            <DeleteInvoiceDialog invoice={row.original} />
                        )}
                    </div>
                )
            },
        },
    ]

    return (
        <div>
            <PageTitle title='Facturas' />

            <Button
                className='mb-3'
                onClick={() =>
                    navigate({ to: '/transacciones/facturas/crear' })
                }
            >
                <PlusIcon size={10} />
                Crear Factura
            </Button>

            <DataTable data={data} columns={columns} />
        </div>
    )
}
