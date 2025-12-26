import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
import {
    type BudgetItemCreateType,
    budgetItemCreateSchema,
    createBudgetItem,
    getPartidasByAccumulate,
} from '@/queries/parametros/partidas'

export default function CreateItemDrawer() {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState<boolean>(false)
    const accum = true
    const form = useAppForm({
        defaultValues: {
            code: '',
            name: '',
            accumulate: false,
            parent_id: '',
        } satisfies BudgetItemCreateType as BudgetItemCreateType,
        validators: {
            onSubmit: budgetItemCreateSchema,
        },
        onSubmit: ({ value }) => {
            mutation.mutate(value)
        },
    })

    const mutation = useMutation({
        mutationFn: (data: BudgetItemCreateType) =>
            createBudgetItem({ data: { data } }),
        onSuccess: () => {
            toast.success('Partida creada con exito')
            queryClient.invalidateQueries({
                queryKey: ['partidas', 'accum'],
            })
            queryClient.invalidateQueries({
                queryKey: ['partidas'],
            })
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

            toast.error('Error al actualizar la partida', {
                richColors: true,
                position: 'top-center',
            })
        },
    })

    const { data: partidas } = useQuery({
        queryKey: ['partidas', 'accum'],
        queryFn: () => getPartidasByAccumulate({ data: { accum } }),
    })

    const options = partidas
        ? partidas.map((partida) => {
              return {
                  value: partida.id,
                  label: partida.name,
              }
          })
        : []

    options.unshift({
        value: '',
        label: 'Seleccione una partida',
    })

    useEffect(() => {
        if (open) {
            form.reset()
        }
    }, [open, form.reset])

    return (
        <Drawer direction='right' open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant='default' className='mb-3'>
                    <PlusIcon size={10} />
                    Crear Partida
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
                        <DrawerTitle>Crear Partida</DrawerTitle>
                        <DrawerDescription>
                            Crea una partida presupuestaria con la información
                            requerida.
                        </DrawerDescription>
                    </DrawerHeader>
                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='code'>
                                {(field) => (
                                    <field.TextField
                                        label='Código'
                                        placeholder='Ingrese el código del proyecto'
                                        name='code'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='name'>
                                {(field) => (
                                    <field.TextField
                                        label='Nombre'
                                        placeholder='Ingrese el nombre del proyecto'
                                        name='name'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='parent_id'>
                                {(field) => (
                                    <field.SelectField
                                        name='parent_id'
                                        label='Partida Padre'
                                        options={options}
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='accumulate'>
                                {(field) => (
                                    <field.SwitchField
                                        label='Acumula'
                                        name='accumulate'
                                    />
                                )}
                            </form.AppField>
                        </FieldSet>
                    </FieldGroup>
                    <DrawerFooter>
                        <Field orientation='horizontal'>
                            <form.AppForm>
                                <form.FormButton label='Guardar' />
                            </form.AppForm>
                            <DrawerClose asChild>
                                <Button variant='outline'>Cancel</Button>
                            </DrawerClose>
                        </Field>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
