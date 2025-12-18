import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, PlusIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import {
    getAllSuppliers,
    type SupplierResponseType,
} from '@/queries/parametros/proveedores'

export const Route = createFileRoute('/_authed/parametros/proveedores')({
    component: RouteComponent,
    loader: ({ context: { queryClient } }) => {
        queryClient.ensureQueryData({
            queryKey: ['proveedores'],
            queryFn: getAllSuppliers,
        })
    },
})

function RouteComponent() {
    const { data } = useSuspenseQuery({
        queryKey: ['proveedores'],
        queryFn: getAllSuppliers,
    })

    const columns: ColumnDef<SupplierResponseType>[] = [
        {
            header: 'Nombre',
            accessorKey: 'name',
        },
        {
            header: 'RUC',
            accessorKey: 'supplier_id',
        },
        {
            header: 'Contacto',
            cell: ({ row }) => {
                return <span>{row.original.contact_name.String}</span>
            },
        },
        {
            header: 'Email',
            cell: ({ row }) => {
                return <span>{row.original.contact_email.String}</span>
            },
        },
        {
            header: 'Teléfono',
            cell: ({ row }) => {
                return <span>{row.original.contact_phone.String}</span>
            },
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
            <PageTitle title='Proveedores' />

            <Button variant='default'>
                <PlusIcon size={10} />
                Crear Proveedor
            </Button>

            <DataTable data={data} columns={columns} />
        </div>
    )
}
