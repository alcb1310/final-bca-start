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
import {
    createRubroMaterialSchema,
    type RubroMaterialCreateType,
} from '@/queries/parametros/rubros'

type CreateItemMaterialProps = {
    id: string
}

export function CreateItemMaterial({ id }: CreateItemMaterialProps) {
    const form = useAppForm({
        defaultValues: {
            item_id: id,
            material_id: '',
            quantity: 0,
        } satisfies RubroMaterialCreateType as RubroMaterialCreateType,
        validators: {
            onSubmit: createRubroMaterialSchema,
        },
        onSubmit: ({ value }) => {
            console.log(value)
        },
    })

    return (
        <Drawer direction='right'>
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
