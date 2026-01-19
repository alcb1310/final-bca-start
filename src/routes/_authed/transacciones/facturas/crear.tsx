import { useQueries } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PageTitle } from '@/components/pages/Title'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import { getAllProjects } from '@/queries/parametros/projects'
import { getAllSuppliers } from '@/queries/parametros/proveedores'
import {
    type FacturaCreateType,
    facturaCreateSchema,
} from '@/queries/transacciones/facturas'

export const Route = createFileRoute('/_authed/transacciones/facturas/crear')({
    component: RouteComponent,
    loader: ({ context: { queryClient } }) => {
        queryClient.ensureQueryData({
            queryKey: ['proveedores'],
            queryFn: () => getAllSuppliers(),
        })
        queryClient.ensureQueryData({
            queryKey: ['proyectos'],
            queryFn: () => getAllProjects(),
        })
    },
})

function RouteComponent() {
    const navigate = useNavigate()
    const form = useAppForm({
        defaultValues: {
            project_id: '',
            supplier_id: '',
            invoice_number: '',
            invoice_date: new Date(),
        } satisfies FacturaCreateType as FacturaCreateType,
        validators: {
            onSubmit: facturaCreateSchema,
        },
        onSubmit: ({ value }) => {
            console.log(value)
        },
    })

    const allQueries = useQueries({
        queries: [
            {
                queryKey: ['proyectos'],
                queryFn: () => getAllProjects(),
            },
            {
                queryKey: ['proveedores'],
                queryFn: () => getAllSuppliers(),
            },
        ],
    })

    const projects =
        allQueries[0].data?.map((project: any) => {
            return {
                label: project.name,
                value: project.id,
            }
        }) || []
    projects.unshift({ label: 'Seleccione un proyecto', value: '' })

    const suppliers =
        allQueries[1].data?.map((supplier: any) => {
            return {
                label: supplier.name,
                value: supplier.id,
            }
        }) || []
    suppliers.unshift({ label: 'Seleccione un proveedor', value: '' })

    return (
        <div>
            <PageTitle title='Crear Factura' />

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
                            <form.AppField name='project_id'>
                                {(field) => (
                                    <field.SelectField
                                        label='Proyecto'
                                        name='project_id'
                                        options={projects}
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='supplier_id'>
                                {(field) => (
                                    <field.SelectField
                                        label='Proveedor'
                                        name='supplier_id'
                                        options={suppliers}
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='invoice_number'>
                                {(field) => (
                                    <field.TextField
                                        label='Número de factura'
                                        placeholder='Ingrese el número de la factura'
                                        name='invoice_number'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='invoice_date'>
                                {(field) => (
                                    <field.TextField
                                        label='Fecha'
                                        name='invoice_date'
                                        type='date'
                                    />
                                )}
                            </form.AppField>
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
        </div>
    )
}
