import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, PlusIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import type { CategoryType } from '@/queries/parametros/categories'

export const Route = createFileRoute('/_authed/parametros/categorias')({
    component: RouteComponent,
})

function RouteComponent() {
    const columns: ColumnDef<CategoryType>[] = [
        {
            header: 'Nombre',
            accessorKey: 'name',
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
            <PageTitle title='Categorias' />

            <Button>
                <PlusIcon size={10} />
                Crear Categoría
            </Button>

            <DataTable columns={columns} data={[]} />
        </div>
    )
}
