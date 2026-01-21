import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import {
    facturaEditSchema,
    FacturaEditType,
    getFactura,
} from '@/queries/transacciones/facturas'
import { useAppForm } from '@/hooks/formHook'
import { PageTitle } from '@/components/pages/Title'
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authed/transacciones/facturas/$id')({
    component: RouteComponent,
    params: {
        parse: (rawParams) => {
            try {
                const id = z.uuid().parse(rawParams.id)
                return { id }
            } catch (error) {
                throw new Error(`Invalid id: ${error}`)
            }
        },
    },
    loader: async ({ context: { queryClient }, params: { id } }) => {
        queryClient.prefetchQuery({
            queryKey: ['factura', id],
            queryFn: () => getFactura({ data: { id } }),
        })
    },
})

function RouteComponent() {
    const { id } = Route.useParams()
    const { data: factura } = useSuspenseQuery({
        queryKey: ['factura', id],
        queryFn: () => getFactura({ data: { id } }),
    })
    const dt = factura.invoice_date.toString().split('T')
    console.log(dt)

    const form = useAppForm({
        defaultValues: {
            id,
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
            console.log(value)
        },
    })

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
                                // navigate({ to: '/transacciones/facturas' })
                            }}
                        >
                            Cancel
                        </Button>
                    </Field>
                </form>
            </div>
        </div>
    )
}
