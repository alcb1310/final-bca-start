import { useMutation } from '@tanstack/react-query'
import { PencilIcon } from 'lucide-react'
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
import {
    type BudgetCreateType,
    type BudgetEditType,
    editBudgetSchema,
    updateBudget,
} from '@/queries/transacciones/presupuesto'

type EditBudgetDrawerProps = {
    budget: BudgetEditType
}

export function EditBudgetDrawer({ budget }: Readonly<EditBudgetDrawerProps>) {
    const [open, setOpen] = useState(false)
    const form = useAppForm({
        defaultValues: budget,
        validators: {
            // @ts-expect-error
            onSubmit: editBudgetSchema,
        },
        onSubmit: ({ value }) => {
            const data: BudgetCreateType = {
                project_id: value.project_id,
                budget_item_id: value.budget_item_id,
                quantity: Number.parseFloat(String(value.quantity)),
                cost: Number.parseFloat(String(value.cost)),
            }

            mutate.mutate(data)
        },
    })

    useEffect(() => {
        if (open) {
            form.reset()
        }
    }, [open, form.reset])

    const mutate = useMutation({
        mutationFn: (data: BudgetCreateType) =>
            updateBudget({ data: { data } }),
        onSuccess: () => {
            toast.success('Proyecto actualizado con exito')
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

    return (
        <Drawer direction='right' open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant='ghost' size={'icon-sm'}>
                    <PencilIcon size={10} className='text-warning' />
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
                        <DrawerTitle>Editar Presupuesto</DrawerTitle>
                        <DrawerDescription>
                            Edita un presupuesto con la información
                            proporcionada.
                        </DrawerDescription>
                    </DrawerHeader>
                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='project_name'>
                                {(field) => (
                                    <field.TextField
                                        label='Proyecto'
                                        name='project_name'
                                        disabled
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='budget_item_name'>
                                {(field) => (
                                    <field.TextField
                                        label='Partida'
                                        name='budget_item_name'
                                        disabled
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
