import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon } from 'lucide-react'
import { CreateBudgetDrawer } from '@/components/drawers/transacciones/presupuesto/create-budget'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import {
    type BudgetResponseType,
    getAllBudgets,
} from '@/queries/transacciones/presupuesto'
import { EditBudgetDrawer } from '@/components/drawers/transacciones/presupuesto/edit-budget'

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
                            <EditBudgetDrawer />
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

            <CreateBudgetDrawer />

            <DataTable data={data} columns={columns} />
        </div>
    )
}
