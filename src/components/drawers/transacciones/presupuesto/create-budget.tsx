import { useMutation, useQueries } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
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
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import { getPartidasByAccumulate } from '@/queries/parametros/partidas'
import { getAllProjects } from '@/queries/parametros/projects'
import {
    type BudgetCreateType,
    createBudget,
    createBudgetSchema,
} from '@/queries/transacciones/presupuesto'

export function CreateBudgetDrawer() {
    const [open, setOpen] = useState(false)
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
            mutation.mutate(value)
        },
    })

    const mutation = useMutation({
        mutationFn: (data: BudgetCreateType) =>
            createBudget({ data: { data } }),
        onSuccess: () => {
            toast.success('Proyecto creado con exito')
            setOpen(false)
        },
        onError: (error) => {
            const e = JSON.parse(error.message)
            if (e.code === 409) {
                toast.error(e.data.message, {
                    richColors: true,
                    position: 'top-center',
                })
                return
            }

            toast.error('Error al crear el proyecto', {
                richColors: true,
                position: 'top-center',
            })
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

    useEffect(() => {
        if (open) {
            form.reset()
        }
    }, [open, form.reset])

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
        <Drawer direction='right' open={open} onOpenChange={setOpen}>
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
                            <form.AppField name='budget_item_id'>
                                {(field) => (
                                    <field.SelectField
                                        label='Partida'
                                        name='budget_item_id'
                                        options={budgetItems}
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='quantity'>
                                {(field) => (
                                    <field.TextField
                                        label='Cantidad'
                                        placeholder='Ingrese la cantidad'
                                        name='quantity'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='cost'>
                                {(field) => (
                                    <field.TextField
                                        label='Costo'
                                        placeholder='Ingrese el costo'
                                        name='cost'
                                    />
                                )}
                            </form.AppField>
                        </FieldSet>
                    </FieldGroup>
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
