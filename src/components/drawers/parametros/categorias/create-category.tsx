import { useMutation } from '@tanstack/react-query'
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
    type CreateCategoryType,
    createCategory,
    createCategorySchema,
} from '@/queries/parametros/categories'

export default function CreateCategoryDrawer() {
    const [open, setOpen] = useState(false)
    const form = useAppForm({
        defaultValues: {
            name: '',
        } satisfies CreateCategoryType as CreateCategoryType,
        validators: {
            onSubmit: createCategorySchema,
        },
        onSubmit: ({ value }) => {
            mutate.mutate(value)
        },
    })

    const mutate = useMutation({
        mutationFn: (data: CreateCategoryType) =>
            createCategory({ data: { data } }),
        onSuccess: () => {
            toast.success('Categoría creada con exito')
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

            toast.error('Error al crear la categoría', {
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
                <Button variant='default' className='mb-3'>
                    <PlusIcon size={10} />
                    Crear Categoría
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
                        <DrawerTitle>Crear Categoría</DrawerTitle>
                        <DrawerDescription>
                            Crea una nueva categoría con la información
                            requerida
                        </DrawerDescription>
                    </DrawerHeader>

                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='name'>
                                {(field) => (
                                    <field.TextField
                                        label='Nombre'
                                        placeholder='Ingrese el nombre de la categoría'
                                        name='name'
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
