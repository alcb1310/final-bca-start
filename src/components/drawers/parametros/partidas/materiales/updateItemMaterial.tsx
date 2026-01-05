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
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import {
    createRubroMaterialSchema,
    type RubroMaterialCreateType,
    type RubroMaterialType,
    updateRubroMaterial,
} from '@/queries/parametros/rubros'

type UpdateItemMaterialProps = {
    itemMaterial: RubroMaterialType
}

export function UpdateItemMaterial({ itemMaterial }: UpdateItemMaterialProps) {
    const [open, setOpen] = useState(false)
    const form = useAppForm({
        defaultValues: {
            item_id: itemMaterial.item_id,
            material_id: itemMaterial.material_id,
            material_name: itemMaterial.material_name,
            quantity: itemMaterial.quantity,
        },
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
            updateRubroMaterial({ data: { data } }),
        onSuccess: () => {
            toast.success('Material actualizado correctamente')
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

            toast.error('Error al actualizar el material', {
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
            <DrawerContent className='px-4'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <DrawerTitle>Editar Material</DrawerTitle>
                    <DrawerDescription>
                        Edita el material asignado al rubro
                    </DrawerDescription>
                    <FieldGroup className='my-5'>
                        <FieldSet>
                            <form.AppField name='material_name'>
                                {(field) => (
                                    <field.TextField
                                        label='Material'
                                        placeholder='Ingrese la cantidad'
                                        name='Material'
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
