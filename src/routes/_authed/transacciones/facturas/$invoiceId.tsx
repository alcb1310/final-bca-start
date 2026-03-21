import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import z from 'zod'
import { CreateInvoiceDetailDrawer } from '@/components/drawers/transacciones/factura/create-detail'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import {
    type DetalleResponseType,
    getDetalles,
} from '@/queries/transacciones/detalle'
import {
    type FacturaEditType,
    facturaEditSchema,
    getFactura,
    updateInvoice,
} from '@/queries/transacciones/facturas'

export const Route = createFileRoute(
    '/_authed/transacciones/facturas/$invoiceId',
)({
    component: RouteComponent,
    params: {
        parse: (rawParams) => {
            try {
                const id = z.uuid().parse(rawParams.invoiceId)
                return { invoiceId: id }
            } catch (error) {
                throw new Error(`Invalid id: ${error}`)
            }
        },
    },
    loader: async ({ context: { queryClient }, params: { invoiceId } }) => {
        queryClient.prefetchQuery({
            queryKey: ['factura', invoiceId],
            queryFn: () => getFactura({ data: { id: invoiceId } }),
        })

        queryClient.ensureQueryData({
            queryKey: ['detalle', invoiceId],
            queryFn: () => getDetalles({ data: { id: invoiceId } }),
        })
    },
})

function RouteComponent() {
    const navigate = useNavigate()
    const { invoiceId } = Route.useParams()
    const { data: factura } = useSuspenseQuery({
        queryKey: ['factura', invoiceId],
        queryFn: () => getFactura({ data: { id: invoiceId } }),
    })

    const { data: detalles } = useSuspenseQuery({
        queryKey: ['detalle', invoiceId],
        queryFn: () => getDetalles({ data: { id: invoiceId } }),
    })
    const dt = factura.invoice_date.toString().split('T')

    const form = useAppForm({
        defaultValues: {
            id: invoiceId,
            project_id: factura.project.id,
            project_name: factura.project.name,
            supplier_id: factura.supplier.id,
            supplier_name: factura.supplier.name,
            invoice_number: factura.invoice_number,
            invoice_total: factura.invoice_total,
            invoice_date: dt[0],
        } satisfies FacturaEditType as FacturaEditType,
        validators: {
            onSubmit: facturaEditSchema,
        },
        onSubmit: ({ value }) => {
            mutation.mutate(value)
        },
    })

    const mutation = useMutation({
        mutationFn: (data: FacturaEditType) =>
            updateInvoice({ data: { data } }),
        onSuccess: () => {
            toast.success('Factura actualizada correctamente')
        },
        onError: (error) => {
            console.error('error', error)
            toast.error('Error al actualizar la factura', {
                richColors: true,
                position: 'top-center',
            })
        },
    })

    const columns: ColumnDef<DetalleResponseType>[] = [
        {
            header: 'Partida',
            accessorKey: 'budget_item.name',
        },
        {
            header: 'Cantidad',
            accessorKey: 'quantity',
            cell: ({ row }) => {
                return (
                    <span className='block text-right'>
                        {row.original.quantity.toLocaleString('es-EC', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                )
            },
        },
        {
            header: 'Costo',
            accessorKey: 'cost',
            cell: ({ row }) => {
                return (
                    <span className='block text-right'>
                        {row.original.cost.toLocaleString('es-EC', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                )
            },
        },
        {
            header: 'Total',
            accessorKey: 'total',
            cell: ({ row }) => {
                return (
                    <span className='block text-right'>
                        {row.original.total.toLocaleString('es-EC', {
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
                return <TrashIcon size={12} className='text-destructive' />
            },
        },
    ]

    return (
        <div>
            <PageTitle title='Editar Factura' />

            <div className='w-1/2 mx-auto'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='project_name'>
                                {(field) => (
                                    <field.TextField
                                        label='Proyecto'
                                        name='project_name'
                                        disabled
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='supplier_name'>
                                {(field) => (
                                    <field.TextField
                                        label='Proveedor'
                                        name='supplier_name'
                                        disabled
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='invoice_number'>
                                {(field) => (
                                    <field.TextField
                                        label='Número de factura'
                                        name='invoice_number'
                                    />
                                )}
                            </form.AppField>
                            <div className='flex justify-between gap-4'>
                                <form.AppField name='invoice_date'>
                                    {(field) => (
                                        <field.TextField
                                            label='Fecha'
                                            name='invoice_date'
                                            type='date'
                                        />
                                    )}
                                </form.AppField>
                                <form.AppField name='invoice_total'>
                                    {(field) => (
                                        <field.TextField
                                            label='Total'
                                            name='invoice_total'
                                            disabled
                                            className='text-right'
                                        />
                                    )}
                                </form.AppField>
                            </div>
                        </FieldSet>
                    </FieldGroup>
                    <Field
                        orientation='horizontal'
                        className='flex justify-around'
                    >
                        <form.AppForm>
                            <form.FormButton label='Guardar' />
                        </form.AppForm>
                        <Button
                            variant='outline'
                            type='button'
                            onClick={() => {
                                navigate({ to: '/transacciones/facturas' })
                            }}
                        >
                            Cancel
                        </Button>
                    </Field>
                </form>
            </div>

            <div className='mt-4 w-3/4 mx-auto'>
                <CreateInvoiceDetailDrawer invoiceId={invoiceId} />

                <DataTable data={detalles} columns={columns} />
            </div>
        </div>
    )
}
