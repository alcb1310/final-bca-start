import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import CreateProjectDrawer from '@/components/drawers/parametros/proyectos/create-project'
import EditProjectDraser from '@/components/drawers/parametros/proyectos/edit-project'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Switch } from '@/components/ui/switch'
import {
    getAllProjects,
    type ProjectResponseType,
} from '@/queries/parametros/projects'

export const Route = createFileRoute('/_authed/parametros/proyectos')({
    component: RouteComponent,
    loader: ({ context: { queryClient } }) => {
        queryClient.ensureQueryData({
            queryKey: ['proyectos'],
            queryFn: getAllProjects,
        })
    },
})

function RouteComponent() {
    const { data } = useSuspenseQuery({
        queryKey: ['proyectos'],
        queryFn: getAllProjects,
    })

    const columns: ColumnDef<ProjectResponseType>[] = [
        {
            header: 'Nombre',
            accessorKey: 'name',
        },
        {
            header: 'Area Bruta',
            size: 200,
            accessorKey: 'gross_area',
            cell: ({ row }) => {
                return (
                    <span className='block text-right'>
                        {row.original.gross_area.toLocaleString('es-EC', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                )
            },
        },
        {
            header: 'Area Neta',
            accessorKey: 'net_area',
            cell: ({ row }) => {
                return (
                    <span className='block text-right'>
                        {row.original.net_area.toLocaleString('es-EC', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                )
            },
        },
        {
            header: 'Activo',
            accessorKey: 'is_active',
            cell: ({ row }) => {
                return (
                    <Switch
                        className='block mx-auto'
                        checked={row.original.is_active}
                        disabled
                    />
                )
            },
        },
        {
            header: '',
            accessorKey: 'actions',
            cell: ({ row }) => {
                return <EditProjectDraser project={row.original} />
            },
        },
    ]

    return (
        <div>
            <PageTitle title='Proyectos' />
            <CreateProjectDrawer />
            <DataTable data={data} columns={columns} />
        </div>
    )
}
