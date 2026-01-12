import { useQueries } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Field } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import { getPartidasByAccumulate } from '@/queries/parametros/partidas'
import { getAllProjects } from '@/queries/parametros/projects'
import {
    createBudgetSchema,
    type BudgetCreateType,
} from '@/queries/transacciones/presupuesto'

export function CreateBudgetDrawer() {
    const form = useAppForm({
        defaultValues: {
            project_id: '',
            budget_item_id: '',
            quantity: 0,
            cost: 0,
        } satisfies BudgetCreateType as BudgetCreateType,
        validators: {
            onSubmit: createBudgetSchema,
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
                queryKey: ['partidas', 'accum'],
                queryFn: () =>
                    getPartidasByAccumulate({ data: { accum: false } }),
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
    const budgetItems =
        allQueries[1].data?.map((budgetItem: any) => {
            return {
                label: budgetItem.name,
                value: budgetItem.id,
            }
        }) || []
    budgetItems.unshift({ label: 'Seleccione una partida', value: '' })

    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='default' className='mb-3'>
                    <PlusIcon size={10} />
                    Crear Presupuesto
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <DrawerHeader>
                        <DrawerTitle>Crear Presupuesto</DrawerTitle>
                        <DrawerDescription>
                            Crea una nueva entrada en el presupuesto del
                            proyecto seleccionado.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Field orientation={'horizontal'}>
                            <form.AppForm>
                                <form.FormButton label='Guardar' />
                            </form.AppForm>
                            <DrawerClose asChild>
                                <Button variant='outline'>Cerrar</Button>
                            </DrawerClose>
                        </Field>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
