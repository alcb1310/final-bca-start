import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PlusIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authed/parametros/materiales')({
    component: RouteComponent,
})

function RouteComponent() {
    const columns: ColumnDef<any>[] = []

    return (
        <div>
            <PageTitle title='Materiales' />

            <Button variant={'default'} size={'sm'}>
                <PlusIcon size={10} />
                Crear Material
            </Button>

            <DataTable columns={columns} data={[]} />
        </div>
    )
}
