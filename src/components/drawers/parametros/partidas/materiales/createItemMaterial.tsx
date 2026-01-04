import { useMutation, useQuery } from '@tanstack/react-query'
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
import { getAllMaterials } from '@/queries/parametros/materiales'
import {
    createRubroMaterial,
    createRubroMaterialSchema,
    type RubroMaterialCreateType,
} from '@/queries/parametros/rubros'

type CreateItemMaterialProps = {
    id: string
}

export function CreateItemMaterial({ id }: CreateItemMaterialProps) {
    const [open, setOpen] = useState(false)
    const { data } = useQuery({
        queryKey: ['materals'],
        queryFn: () => getAllMaterials(),
    })
    const form = useAppForm({
        defaultValues: {
            item_id: id,
            material_id: '',
            quantity: 0,
        } satisfies RubroMaterialCreateType as RubroMaterialCreateType,
        validators: {
            // @ts-expect-error: TODO fix typescript error
            onSubmit: createRubroMaterialSchema,
        },
        onSubmit: ({ value }) => {
            mutate.mutate(value)
        },
    })

    const mutate = useMutation({
        mutationFn: (data: RubroMaterialCreateType) =>
            createRubroMaterial({ data: { data } }),
        onSuccess: () => {
            toast.success('Material creado correctamente')
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

    const materials =
        data?.map((material) => {
            return {
                value: material.id,
                label: material.name,
            }
        }) || []
    materials.unshift({ value: '', label: 'Seleccione un material' })

    useEffect(() => {
        if (open) {
            form.reset()
        }
    }, [open, form.reset])

    return (
        <Drawer direction='right' open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className='mb-3'>
                    <PlusIcon size={10} />
                    Agregar Material
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
                        <DrawerTitle>Agregar Material</DrawerTitle>
                        <DrawerDescription>
                            Agrega un material al rubro de acuerdo a la
                            información proporcionada.
                        </DrawerDescription>
                    </DrawerHeader>
                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='material_id'>
                                {(field) => (
                                    <field.SelectField
                                        label='Materiales'
                                        name='category_id'
                                        options={materials}
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
                        </FieldSet>
                    </FieldGroup>
                    <DrawerFooter>
                        <Field orientation={'horizontal'}>
                            <form.AppForm>
                                <form.FormButton label='Guardar' />
                            </form.AppForm>
                            <DrawerClose asChild>
                                <Button variant={'outline'}>Cancelar</Button>
                            </DrawerClose>
                        </Field>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
