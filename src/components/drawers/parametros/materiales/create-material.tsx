import { useMutation, useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
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
import { getAllCategories } from '@/queries/parametros/categories'
import {
    type MaterialCreateType,
    materialCreateSchema,
    createMaterial,
} from '@/queries/parametros/materiales'
import { toast } from 'sonner'

export function CreateMaterial() {
    const [open, setOpen] = useState(false)
    const { data } = useQuery({
        queryKey: ['categorias'],
        queryFn: () => getAllCategories(),
    })
    const form = useAppForm({
        defaultValues: {
            name: '',
            code: '',
            unit: '',
            category_id: '',
        } satisfies MaterialCreateType as MaterialCreateType,
        validators: {
            onSubmit: materialCreateSchema,
        },
        onSubmit: ({ value }) => {
            mutate.mutate(value)
        },
    })

    const mutate = useMutation({
        mutationFn: (data: MaterialCreateType) =>
            createMaterial({ data: { data } }),
        onSuccess: () => {
            toast.success('Material creado correctamente')
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
            toast.error('Error al crear la categoría', {
                richColors: true,
                position: 'top-center',
            })
        },
    })

    const catValues =
        data?.map((item) => ({
            label: item.name,
            value: item.id,
        })) || []
    catValues.unshift({
        label: 'Seleccione una categoria',
        value: '',
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
                    Crear Material
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
                        <DrawerTitle>Crear Material</DrawerTitle>
                        <DrawerDescription>
                            Crea un nuevo material con la información
                            proporcionada.
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
                            <form.AppField name='category_id'>
                                {(field) => (
                                    <field.SelectField
                                        label='Categoría'
                                        name='category_id'
                                        options={catValues}
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
