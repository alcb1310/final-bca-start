import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authed/parametros/categorias')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <PageTitle title='Categorias' />

            <Button>
                <PlusIcon size={10} />
                Crear Categoría
            </Button>

            <DataTable columns={[]} data={[]} />
        </div>
    )
}
