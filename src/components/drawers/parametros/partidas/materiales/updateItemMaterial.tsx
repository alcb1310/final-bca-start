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
import { Field } from '@/components/ui/field'
import type { RubroMaterialType } from '@/queries/parametros/rubros'

type UpdateItemMaterialProps = {
    itemMaterial: RubroMaterialType
}

export function UpdateItemMaterial({ itemMaterial }: UpdateItemMaterialProps) {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button size={'icon-sm'} variant={'ghost'}>
                    <PencilIcon className='text-warning' />
                </Button>
            </DrawerTrigger>
            <DrawerContent className='px-4'>
                <form>
                    <DrawerTitle>Editar Material</DrawerTitle>
                    <DrawerDescription>
                        Edita el material asignado al rubro
                    </DrawerDescription>
                    <DrawerFooter>
                        <Field orientation={'horizontal'}>
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
