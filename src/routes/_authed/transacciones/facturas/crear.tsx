import { useQueries } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { PageTitle } from '@/components/pages/Title'
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
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            ></form>
        </div>
    )
}
