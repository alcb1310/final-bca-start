import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PlusIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authed/parametros/rubros/')({
    component: RouteComponent,
})

function RouteComponent() {
    const columns: ColumnDef<any>[] = []
    return (
        <div>
            <PageTitle title='Rubros' />

            <Button>
                <PlusIcon size={10} />
                Crear Rubro
            </Button>

            <DataTable columns={columns} data={[]} />
        </div>
    )
}
