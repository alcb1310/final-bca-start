import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, PlusIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import {
    type BudgetResponseType,
    getAllBudgets,
} from '@/queries/transacciones/presupuesto'

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
    const columns: ColumnDef<BudgetResponseType>[] = [
        {
            header: 'Proyecto',
            accessorKey: 'project.name',
        },
        {
            header: 'Código',
            accessorKey: 'budget_item.code',
        },
        {
            header: 'Nombre',
            accessorKey: 'budget_item.name',
        },
        {
            header: 'Cantidad',
            cell: ({ row }) => {
                return (
                    <span className='block text-right'>
                        {row.original.remaining_quantity.Valid
                            ? row.original.remaining_quantity.Float64?.toLocaleString(
                                'es-EC',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                },
                            )
                            : ''}
                    </span>
                )
            },
        },
        {
            header: 'Costo',
            cell: ({ row }) => {
                return (
                    <span className='block text-right'>
                        {row.original.remaining_cost.Valid
                            ? row.original.remaining_cost.Float64?.toLocaleString(
                                'es-EC',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                },
                            )
                            : ''}
                    </span>
                )
            },
        },
        {
            header: 'Total',
            cell: ({ row }) => {
                return (
                    <span className='block text-right'>
                        {row.original.remaining_total.toLocaleString('es-EC', {
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
                    <>
                        {!row.original.budget_item.accumulate && (
                            <PencilIcon size={10} className='text-warning' />
                        )}
                    </>
                )
            },
        },
    ]

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
