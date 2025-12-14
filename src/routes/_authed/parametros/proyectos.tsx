import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, PlusIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
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
            header: '',
            accessorKey: 'actions',
            cell: () => {
                return <PencilIcon className='text-warning' size={16} />
            },
        },
    ]

    return (
        <div>
            <PageTitle title='Proyectos' />

            <Button variant='ghost' className='mb-3'>
                <PlusIcon size={10} />
                Crear Proyecto
            </Button>

            <DataTable data={data} columns={columns} />
        </div>
    )
}
