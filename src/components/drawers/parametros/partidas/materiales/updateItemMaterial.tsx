import { PencilIcon } from 'lucide-react'
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
    type RubroMaterialType,
} from '@/queries/parametros/rubros'

type UpdateItemMaterialProps = {
    itemMaterial: RubroMaterialType
}

export function UpdateItemMaterial({ itemMaterial }: UpdateItemMaterialProps) {
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
            console.log(value)
        },
    })

    return (
        <Drawer direction='right'>
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
