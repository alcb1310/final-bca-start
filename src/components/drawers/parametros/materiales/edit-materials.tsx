import { useMutation, useQueryClient } from '@tanstack/react-query'
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
    type MaterialResponseType,
    materialResponseSchema,
    updateMaterial,
} from '@/queries/parametros/materiales'

interface EditMaterialProps {
    material: MaterialResponseType
}

export function EditMaterial({ material }: Readonly<EditMaterialProps>) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const form = useAppForm({
        defaultValues: material,
        validators: {
            onSubmit: materialResponseSchema,
        },
        onSubmit: ({ value }) => {
            mutate.mutate(value)
        },
    })

    const mutate = useMutation({
        mutationFn: (data: MaterialResponseType) =>
            updateMaterial({ data: { data } }),
        onSuccess: () => {
            toast.success('Material actualizado correctamente')
            queryClient.invalidateQueries({
                queryKey: ['materiales'],
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

            console.error('error', error)
            toast.error('Error al actualizar la categoría', {
                richColors: true,
                position: 'top-center',
            })
        },
    })

    useEffect(() => {
        if (open) {
            form.reset()
        }
    }, [open, form.reset])

    return (
        <Drawer direction='right' open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button size={'icon-sm'} variant={'ghost'}>
                    <PencilIcon className='text-warning' />
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
                        <DrawerTitle>Editar Material</DrawerTitle>
                        <DrawerDescription>
                            Edita el material con la información proporcionada
                        </DrawerDescription>
                    </DrawerHeader>
                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='code'>
                                {(field) => (
                                    <field.TextField
                                        label='Código'
                                        placeholder='Ingrese el código del material'
                                        name='code'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='name'>
                                {(field) => (
                                    <field.TextField
                                        label='Nombre'
                                        placeholder='Ingrese el nombre del material'
                                        name='name'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='unit'>
                                {(field) => (
                                    <field.TextField
                                        label='Unidad'
                                        placeholder='Ingrese la unidad del material'
                                        name='unit'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='category.name'>
                                {(field) => (
                                    <field.TextField
                                        label='Categoría'
                                        name='category.name'
                                        disabled={true}
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
